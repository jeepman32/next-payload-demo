/* eslint-disable @typescript-eslint/no-var-requires */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "connect", {
    enumerable: true,
    get: function() {
        return connect;
    }
});
const _mongoose = /*#__PURE__*/ _interop_require_default(require("mongoose"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const connect = async function connect(payload) {
    if (this.url === false) {
        return;
    }
    if (!payload.local && typeof this.url !== 'string') {
        throw new Error('Error: missing MongoDB connection URL.');
    }
    let urlToConnect = this.url;
    let successfulConnectionMessage = 'Connected to MongoDB server successfully!';
    const connectionOptions = {
        autoIndex: true,
        ...this.connectOptions,
        useFacet: undefined
    };
    if (process.env.NODE_ENV === 'test') {
        if (process.env.PAYLOAD_TEST_MONGO_URL) {
            urlToConnect = process.env.PAYLOAD_TEST_MONGO_URL;
        } else {
            connectionOptions.dbName = 'payloadmemory';
            const { MongoMemoryReplSet } = require('mongodb-memory-server');
            const getPort = require('get-port');
            const port = await getPort();
            this.mongoMemoryServer = await MongoMemoryReplSet.create({
                instance: {
                    dbName: 'payloadmemory',
                    port
                },
                replSet: {
                    count: 3
                }
            });
            urlToConnect = this.mongoMemoryServer.getUri();
            successfulConnectionMessage = 'Connected to in-memory MongoDB server successfully!';
        }
    }
    try {
        console.log('trying')
        const connect = _mongoose.default.connect(urlToConnect, connectionOptions)
        console.log('connect', typeof connect);
        const fulfilled = await connect;
        console.log('fulfilled', typeof fulfilled);
        fulfilled.connection.on('buffer', data => {
            console.log('Buffered', _mongoose.default.connection.readyState, data);
        });
        this.connection = fulfilled.connection;
        console.log('this connection');
        _mongoose.default.set('debug', function (coll, method, query, doc, options) {
            console.log("MONGOOSE", coll, method, query, doc, options, _mongoose.default.connection.readyState)
           });
        this.connection.on('error', console.log);
        this.trackingKey = Math.floor(Math.random() * 1000)
        console.log('started:', this.trackingKey, this.connection.readyState)
        const client = this.connection.getClient();
        console.log('typeof', this.trackingKey, typeof client)
        if (!client.options.replicaSet) {
            this.transactionOptions = false;
            this.beginTransaction = undefined;
        }
        if (process.env.PAYLOAD_DROP_DATABASE === 'true') {
            this.payload.logger.info('---- DROPPING DATABASE ----');
            await _mongoose.default.connection.dropDatabase();
            this.payload.logger.info('---- DROPPED DATABASE ----');
        }
        this.payload.logger.info(successfulConnectionMessage);
    } catch (err) {
        this.payload.logger.error(`Error: cannot connect to MongoDB. Details: ${err.message}`, err);
        process.exit(1);
    }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZWN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXMgKi9cbmltcG9ydCB0eXBlIHsgQ29ubmVjdE9wdGlvbnMgfSBmcm9tICdtb25nb29zZSdcbmltcG9ydCB0eXBlIHsgQ29ubmVjdCB9IGZyb20gJ3BheWxvYWQvZGF0YWJhc2UnXG5cbmltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSdcblxuaW1wb3J0IHR5cGUgeyBNb25nb29zZUFkYXB0ZXIgfSBmcm9tICcuJ1xuXG5leHBvcnQgY29uc3QgY29ubmVjdDogQ29ubmVjdCA9IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3QodGhpczogTW9uZ29vc2VBZGFwdGVyLCBwYXlsb2FkKSB7XG4gIGlmICh0aGlzLnVybCA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmICghcGF5bG9hZC5sb2NhbCAmJiB0eXBlb2YgdGhpcy51cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvcjogbWlzc2luZyBNb25nb0RCIGNvbm5lY3Rpb24gVVJMLicpXG4gIH1cblxuICBsZXQgdXJsVG9Db25uZWN0ID0gdGhpcy51cmxcbiAgbGV0IHN1Y2Nlc3NmdWxDb25uZWN0aW9uTWVzc2FnZSA9ICdDb25uZWN0ZWQgdG8gTW9uZ29EQiBzZXJ2ZXIgc3VjY2Vzc2Z1bGx5ISdcblxuICBjb25zdCBjb25uZWN0aW9uT3B0aW9uczogQ29ubmVjdE9wdGlvbnMgJiB7IHVzZUZhY2V0OiB1bmRlZmluZWQgfSA9IHtcbiAgICBhdXRvSW5kZXg6IHRydWUsXG4gICAgLi4udGhpcy5jb25uZWN0T3B0aW9ucyxcbiAgICB1c2VGYWNldDogdW5kZWZpbmVkLFxuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuUEFZTE9BRF9URVNUX01PTkdPX1VSTCkge1xuICAgICAgdXJsVG9Db25uZWN0ID0gcHJvY2Vzcy5lbnYuUEFZTE9BRF9URVNUX01PTkdPX1VSTFxuICAgIH0gZWxzZSB7XG4gICAgICBjb25uZWN0aW9uT3B0aW9ucy5kYk5hbWUgPSAncGF5bG9hZG1lbW9yeSdcbiAgICAgIGNvbnN0IHsgTW9uZ29NZW1vcnlSZXBsU2V0IH0gPSByZXF1aXJlKCdtb25nb2RiLW1lbW9yeS1zZXJ2ZXInKVxuICAgICAgY29uc3QgZ2V0UG9ydCA9IHJlcXVpcmUoJ2dldC1wb3J0JylcblxuICAgICAgY29uc3QgcG9ydCA9IGF3YWl0IGdldFBvcnQoKVxuICAgICAgdGhpcy5tb25nb01lbW9yeVNlcnZlciA9IGF3YWl0IE1vbmdvTWVtb3J5UmVwbFNldC5jcmVhdGUoe1xuICAgICAgICBpbnN0YW5jZToge1xuICAgICAgICAgIGRiTmFtZTogJ3BheWxvYWRtZW1vcnknLFxuICAgICAgICAgIHBvcnQsXG4gICAgICAgIH0sXG4gICAgICAgIHJlcGxTZXQ6IHtcbiAgICAgICAgICBjb3VudDogMyxcbiAgICAgICAgfSxcbiAgICAgIH0pXG5cbiAgICAgIHVybFRvQ29ubmVjdCA9IHRoaXMubW9uZ29NZW1vcnlTZXJ2ZXIuZ2V0VXJpKClcbiAgICAgIHN1Y2Nlc3NmdWxDb25uZWN0aW9uTWVzc2FnZSA9ICdDb25uZWN0ZWQgdG8gaW4tbWVtb3J5IE1vbmdvREIgc2VydmVyIHN1Y2Nlc3NmdWxseSEnXG4gICAgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICB0aGlzLmNvbm5lY3Rpb24gPSAoYXdhaXQgbW9uZ29vc2UuY29ubmVjdCh1cmxUb0Nvbm5lY3QsIGNvbm5lY3Rpb25PcHRpb25zKSkuY29ubmVjdGlvblxuXG4gICAgY29uc3QgY2xpZW50ID0gdGhpcy5jb25uZWN0aW9uLmdldENsaWVudCgpXG5cbiAgICBpZiAoIWNsaWVudC5vcHRpb25zLnJlcGxpY2FTZXQpIHtcbiAgICAgIHRoaXMudHJhbnNhY3Rpb25PcHRpb25zID0gZmFsc2VcbiAgICAgIHRoaXMuYmVnaW5UcmFuc2FjdGlvbiA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5QQVlMT0FEX0RST1BfREFUQUJBU0UgPT09ICd0cnVlJykge1xuICAgICAgdGhpcy5wYXlsb2FkLmxvZ2dlci5pbmZvKCctLS0tIERST1BQSU5HIERBVEFCQVNFIC0tLS0nKVxuICAgICAgYXdhaXQgbW9uZ29vc2UuY29ubmVjdGlvbi5kcm9wRGF0YWJhc2UoKVxuICAgICAgdGhpcy5wYXlsb2FkLmxvZ2dlci5pbmZvKCctLS0tIERST1BQRUQgREFUQUJBU0UgLS0tLScpXG4gICAgfVxuICAgIHRoaXMucGF5bG9hZC5sb2dnZXIuaW5mbyhzdWNjZXNzZnVsQ29ubmVjdGlvbk1lc3NhZ2UpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRoaXMucGF5bG9hZC5sb2dnZXIuZXJyb3IoYEVycm9yOiBjYW5ub3QgY29ubmVjdCB0byBNb25nb0RCLiBEZXRhaWxzOiAke2Vyci5tZXNzYWdlfWAsIGVycilcbiAgICBwcm9jZXNzLmV4aXQoMSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbImNvbm5lY3QiLCJwYXlsb2FkIiwidXJsIiwibG9jYWwiLCJFcnJvciIsInVybFRvQ29ubmVjdCIsInN1Y2Nlc3NmdWxDb25uZWN0aW9uTWVzc2FnZSIsImNvbm5lY3Rpb25PcHRpb25zIiwiYXV0b0luZGV4IiwiY29ubmVjdE9wdGlvbnMiLCJ1c2VGYWNldCIsInVuZGVmaW5lZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIlBBWUxPQURfVEVTVF9NT05HT19VUkwiLCJkYk5hbWUiLCJNb25nb01lbW9yeVJlcGxTZXQiLCJyZXF1aXJlIiwiZ2V0UG9ydCIsInBvcnQiLCJtb25nb01lbW9yeVNlcnZlciIsImNyZWF0ZSIsImluc3RhbmNlIiwicmVwbFNldCIsImNvdW50IiwiZ2V0VXJpIiwiY29ubmVjdGlvbiIsIm1vbmdvb3NlIiwiY2xpZW50IiwiZ2V0Q2xpZW50Iiwib3B0aW9ucyIsInJlcGxpY2FTZXQiLCJ0cmFuc2FjdGlvbk9wdGlvbnMiLCJiZWdpblRyYW5zYWN0aW9uIiwiUEFZTE9BRF9EUk9QX0RBVEFCQVNFIiwibG9nZ2VyIiwiaW5mbyIsImRyb3BEYXRhYmFzZSIsImVyciIsImVycm9yIiwibWVzc2FnZSIsImV4aXQiXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDs7OzsrQkFReENBOzs7ZUFBQUE7OztpRUFKUTs7Ozs7O0FBSWQsTUFBTUEsVUFBbUIsZUFBZUEsUUFBK0JDLE9BQU87SUFDbkYsSUFBSSxJQUFJLENBQUNDLEdBQUcsS0FBSyxPQUFPO1FBQ3RCO0lBQ0Y7SUFFQSxJQUFJLENBQUNELFFBQVFFLEtBQUssSUFBSSxPQUFPLElBQUksQ0FBQ0QsR0FBRyxLQUFLLFVBQVU7UUFDbEQsTUFBTSxJQUFJRSxNQUFNO0lBQ2xCO0lBRUEsSUFBSUMsZUFBZSxJQUFJLENBQUNILEdBQUc7SUFDM0IsSUFBSUksOEJBQThCO0lBRWxDLE1BQU1DLG9CQUE4RDtRQUNsRUMsV0FBVztRQUNYLEdBQUcsSUFBSSxDQUFDQyxjQUFjO1FBQ3RCQyxVQUFVQztJQUNaO0lBRUEsSUFBSUMsUUFBUUMsR0FBRyxDQUFDQyxRQUFRLEtBQUssUUFBUTtRQUNuQyxJQUFJRixRQUFRQyxHQUFHLENBQUNFLHNCQUFzQixFQUFFO1lBQ3RDVixlQUFlTyxRQUFRQyxHQUFHLENBQUNFLHNCQUFzQjtRQUNuRCxPQUFPO1lBQ0xSLGtCQUFrQlMsTUFBTSxHQUFHO1lBQzNCLE1BQU0sRUFBRUMsa0JBQWtCLEVBQUUsR0FBR0MsUUFBUTtZQUN2QyxNQUFNQyxVQUFVRCxRQUFRO1lBRXhCLE1BQU1FLE9BQU8sTUFBTUQ7WUFDbkIsSUFBSSxDQUFDRSxpQkFBaUIsR0FBRyxNQUFNSixtQkFBbUJLLE1BQU0sQ0FBQztnQkFDdkRDLFVBQVU7b0JBQ1JQLFFBQVE7b0JBQ1JJO2dCQUNGO2dCQUNBSSxTQUFTO29CQUNQQyxPQUFPO2dCQUNUO1lBQ0Y7WUFFQXBCLGVBQWUsSUFBSSxDQUFDZ0IsaUJBQWlCLENBQUNLLE1BQU07WUFDNUNwQiw4QkFBOEI7UUFDaEM7SUFDRjtJQUVBLElBQUk7UUFDRixJQUFJLENBQUNxQixVQUFVLEdBQUcsQUFBQyxDQUFBLE1BQU1DLGlCQUFRLENBQUM1QixPQUFPLENBQUNLLGNBQWNFLGtCQUFpQixFQUFHb0IsVUFBVTtRQUV0RixNQUFNRSxTQUFTLElBQUksQ0FBQ0YsVUFBVSxDQUFDRyxTQUFTO1FBRXhDLElBQUksQ0FBQ0QsT0FBT0UsT0FBTyxDQUFDQyxVQUFVLEVBQUU7WUFDOUIsSUFBSSxDQUFDQyxrQkFBa0IsR0FBRztZQUMxQixJQUFJLENBQUNDLGdCQUFnQixHQUFHdkI7UUFDMUI7UUFFQSxJQUFJQyxRQUFRQyxHQUFHLENBQUNzQixxQkFBcUIsS0FBSyxRQUFRO1lBQ2hELElBQUksQ0FBQ2xDLE9BQU8sQ0FBQ21DLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDO1lBQ3pCLE1BQU1ULGlCQUFRLENBQUNELFVBQVUsQ0FBQ1csWUFBWTtZQUN0QyxJQUFJLENBQUNyQyxPQUFPLENBQUNtQyxNQUFNLENBQUNDLElBQUksQ0FBQztRQUMzQjtRQUNBLElBQUksQ0FBQ3BDLE9BQU8sQ0FBQ21DLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDL0I7SUFDM0IsRUFBRSxPQUFPaUMsS0FBSztRQUNaLElBQUksQ0FBQ3RDLE9BQU8sQ0FBQ21DLE1BQU0sQ0FBQ0ksS0FBSyxDQUFDLENBQUMsMkNBQTJDLEVBQUVELElBQUlFLE9BQU8sQ0FBQyxDQUFDLEVBQUVGO1FBQ3ZGM0IsUUFBUThCLElBQUksQ0FBQztJQUNmO0FBQ0YifQ==
