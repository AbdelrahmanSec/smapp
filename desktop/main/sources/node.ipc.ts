import { combineLatestWith, from, map } from 'rxjs';
import { ipcConsts } from '../../../app/vars';
import {
  fromIPC,
  handleIPC,
  handlerResult,
  makeSubscription,
} from '../rx.utils';
import { addAppLogFile, addNodeLogFile } from '../../sentry';

const nodeIPCStreams = () => ({
  $nodeRestartRequest: fromIPC<void>(ipcConsts.N_M_RESTART_NODE),
});

export const sentryLogsListener = () =>
  makeSubscription(
    handleIPC(
      ipcConsts.GET_NODE_AND_APP_LOGS,
      () => {
        return from(addNodeLogFile())
          .pipe(combineLatestWith(addAppLogFile()))
          .pipe(
            map(([nodelog, appLog]) =>
              handlerResult({
                genesisID: nodelog.genesisID,
                nodeLogs: nodelog.content,
                appLogs: appLog.content,
                appLogsFileName: appLog.fileName,
              })
            )
          );
      },
      (res) => res
    ),
    (_) => {}
  );

export default nodeIPCStreams;
