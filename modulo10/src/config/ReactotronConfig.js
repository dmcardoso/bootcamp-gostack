import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

import Asyncstorage from '@react-native-community/async-storage';

if (__DEV__) {
    const tron = Reactotron.setAsyncStorageHandler(Asyncstorage)
        .configure({
            host: '10.0.0.104',
        })
        .useReactNative()
        .use(reactotronRedux())
        .use(reactotronSaga())
        .connect();

    tron.clear();

    console.tron = tron;
}
