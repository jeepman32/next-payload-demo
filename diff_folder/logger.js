"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    defaultLoggerOptions: function() {
        return defaultLoggerOptions;
    },
    prettySyncLoggerDestination: function() {
        return prettySyncLoggerDestination;
    }
});
const _pino = /*#__PURE__*/ _interop_require_default(require("pino"));
const _pinopretty = /*#__PURE__*/ _interop_require_default(require("pino-pretty"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const prettyOptions = {
    colorize: true,
    ignore: 'pid,hostname',
    translateTime: 'SYS:HH:MM:ss'
};
const defaultLoggerOptions = {
    transport: {
        options: prettyOptions,
        target: 'pino-pretty'
    }
};
const prettySyncLoggerDestination = (0, _pinopretty.default)({
    ...prettyOptions,
    destination: 1,
    sync: true
});
const getLogger = (name = 'payload', options, destination)=>(0, _pino.default)({
        name: options?.name || name,
        enabled: process.env.DISABLE_LOGGING !== 'true',
        ...options || defaultLoggerOptions,
        level: 'debug',
        enabled: true,
        browser: {
            fatal: console.log,
            error: console.log,
            warn: console.log,
            info: console.log,
            debug: console.log,
            trace: console.log,
        }
    }, destination);
const _default = getLogger;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvbG9nZ2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwaW5vIGZyb20gJ3Bpbm8nXG5pbXBvcnQgcHJldHRpZmllciBmcm9tICdwaW5vLXByZXR0eSdcblxuZXhwb3J0IHR5cGUgUGF5bG9hZExvZ2dlciA9IHBpbm8uTG9nZ2VyXG5cbmNvbnN0IHByZXR0eU9wdGlvbnMgPSB7XG4gIGNvbG9yaXplOiB0cnVlLFxuICBpZ25vcmU6ICdwaWQsaG9zdG5hbWUnLFxuICB0cmFuc2xhdGVUaW1lOiAnU1lTOkhIOk1NOnNzJyxcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRMb2dnZXJPcHRpb25zOiBwaW5vLkxvZ2dlck9wdGlvbnMgPSB7XG4gIHRyYW5zcG9ydDoge1xuICAgIG9wdGlvbnM6IHByZXR0eU9wdGlvbnMsXG4gICAgdGFyZ2V0OiAncGluby1wcmV0dHknLFxuICB9LFxufVxuXG5leHBvcnQgY29uc3QgcHJldHR5U3luY0xvZ2dlckRlc3RpbmF0aW9uID0gcHJldHRpZmllcih7XG4gIC4uLnByZXR0eU9wdGlvbnMsXG4gIGRlc3RpbmF0aW9uOiAxLCAvLyBzdGRvdXRcbiAgc3luYzogdHJ1ZSxcbn0pXG5cbmNvbnN0IGdldExvZ2dlciA9IChcbiAgbmFtZSA9ICdwYXlsb2FkJyxcbiAgb3B0aW9ucz86IHBpbm8uTG9nZ2VyT3B0aW9ucyxcbiAgZGVzdGluYXRpb24/OiBwaW5vLkRlc3RpbmF0aW9uU3RyZWFtLFxuKTogUGF5bG9hZExvZ2dlciA9PlxuICBwaW5vKFxuICAgIHtcbiAgICAgIG5hbWU6IG9wdGlvbnM/Lm5hbWUgfHwgbmFtZSxcbiAgICAgIGVuYWJsZWQ6IHByb2Nlc3MuZW52LkRJU0FCTEVfTE9HR0lORyAhPT0gJ3RydWUnLFxuICAgICAgLi4uKG9wdGlvbnMgfHwgZGVmYXVsdExvZ2dlck9wdGlvbnMpLFxuICAgIH0sXG4gICAgZGVzdGluYXRpb24sXG4gIClcblxuZXhwb3J0IGRlZmF1bHQgZ2V0TG9nZ2VyXG4iXSwibmFtZXMiOlsiZGVmYXVsdExvZ2dlck9wdGlvbnMiLCJwcmV0dHlTeW5jTG9nZ2VyRGVzdGluYXRpb24iLCJwcmV0dHlPcHRpb25zIiwiY29sb3JpemUiLCJpZ25vcmUiLCJ0cmFuc2xhdGVUaW1lIiwidHJhbnNwb3J0Iiwib3B0aW9ucyIsInRhcmdldCIsInByZXR0aWZpZXIiLCJkZXN0aW5hdGlvbiIsInN5bmMiLCJnZXRMb2dnZXIiLCJuYW1lIiwicGlubyIsImVuYWJsZWQiLCJwcm9jZXNzIiwiZW52IiwiRElTQUJMRV9MT0dHSU5HIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQXNDQSxPQUF3QjtlQUF4Qjs7SUEzQmFBLG9CQUFvQjtlQUFwQkE7O0lBT0FDLDJCQUEyQjtlQUEzQkE7Ozs2REFsQkk7bUVBQ007Ozs7OztBQUl2QixNQUFNQyxnQkFBZ0I7SUFDcEJDLFVBQVU7SUFDVkMsUUFBUTtJQUNSQyxlQUFlO0FBQ2pCO0FBRU8sTUFBTUwsdUJBQTJDO0lBQ3RETSxXQUFXO1FBQ1RDLFNBQVNMO1FBQ1RNLFFBQVE7SUFDVjtBQUNGO0FBRU8sTUFBTVAsOEJBQThCUSxJQUFBQSxtQkFBVSxFQUFDO0lBQ3BELEdBQUdQLGFBQWE7SUFDaEJRLGFBQWE7SUFDYkMsTUFBTTtBQUNSO0FBRUEsTUFBTUMsWUFBWSxDQUNoQkMsT0FBTyxTQUFTLEVBQ2hCTixTQUNBRyxjQUVBSSxJQUFBQSxhQUFJLEVBQ0Y7UUFDRUQsTUFBTU4sU0FBU00sUUFBUUE7UUFDdkJFLFNBQVNDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZSxLQUFLO1FBQ3pDLEdBQUlYLFdBQVdQLG9CQUFvQjtJQUNyQyxHQUNBVTtNQUdKLFdBQWVFIn0=
