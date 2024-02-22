/* eslint-disable no-param-reassign */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "init", {
    enumerable: true,
    get: function() {
        return init;
    }
});
const _mongoose = /*#__PURE__*/ _interop_require_default(require("mongoose"));
const _mongooseaggregatepaginatev2 = /*#__PURE__*/ _interop_require_default(require("mongoose-aggregate-paginate-v2"));
const _mongoosepaginatev2 = /*#__PURE__*/ _interop_require_default(require("mongoose-paginate-v2"));
const _versions = require("payload/versions");
const _buildCollectionSchema = /*#__PURE__*/ _interop_require_default(require("./models/buildCollectionSchema"));
const _buildGlobalModel = require("./models/buildGlobalModel");
const _buildSchema = /*#__PURE__*/ _interop_require_default(require("./models/buildSchema"));
const _buildQuery = /*#__PURE__*/ _interop_require_default(require("./queries/buildQuery"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const init = function init() {
    this.payload.config.collections.forEach((collection)=>{
        const schema = (0, _buildCollectionSchema.default)(collection, this.payload.config);
        if (collection.versions) {
            const versionModelName = (0, _versions.getVersionsModelName)(collection);
            const versionCollectionFields = (0, _versions.buildVersionCollectionFields)(collection);
            const versionSchema = (0, _buildSchema.default)(this.payload.config, versionCollectionFields, {
                disableUnique: true,
                draftsEnabled: true,
                options: {
                    minimize: false,
                    timestamps: false
                }
            });
            versionSchema.plugin(_mongoosepaginatev2.default, {
                useEstimatedCount: true
            }).plugin((0, _buildQuery.default)({
                collectionSlug: collection.slug,
                versionsFields: versionCollectionFields
            }));
            if (collection.versions?.drafts) {
                versionSchema.plugin(_mongooseaggregatepaginatev2.default);
            }
            const model = _mongoose.default.model(versionModelName, versionSchema, this.autoPluralization === true ? undefined : versionModelName);
            // this.payload.versions[collection.slug] = model;
            this.versions[collection.slug] = model;
        }
        const model = _mongoose.default.model(collection.slug, schema, this.autoPluralization === true ? undefined : collection.slug);
        this.collections[collection.slug] = model;
        // TS expect error only needed until we launch 2.0.0
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        this.payload.collections[collection.slug] = {
            config: collection
        };
    });
    const model = (0, _buildGlobalModel.buildGlobalModel)(this.payload.config);
    this.globals = model;
    this.payload.config.globals.forEach((global)=>{
        if (global.versions) {
            const versionModelName = (0, _versions.getVersionsModelName)(global);
            const versionGlobalFields = (0, _versions.buildVersionGlobalFields)(global);
            const versionSchema = (0, _buildSchema.default)(this.payload.config, versionGlobalFields, {
                disableUnique: true,
                draftsEnabled: true,
                indexSortableFields: this.payload.config.indexSortableFields,
                options: {
                    minimize: false,
                    timestamps: false
                }
            });
            versionSchema.plugin(_mongoosepaginatev2.default, {
                useEstimatedCount: true
            }).plugin((0, _buildQuery.default)({
                versionsFields: versionGlobalFields
            }));
            const versionsModel = _mongoose.default.model(versionModelName, versionSchema, versionModelName);
            this.versions[global.slug] = versionsModel;
        }
    });
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbml0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5pbXBvcnQgdHlwZSB7IFBhZ2luYXRlT3B0aW9ucyB9IGZyb20gJ21vbmdvb3NlJ1xuaW1wb3J0IHR5cGUgeyBJbml0IH0gZnJvbSAncGF5bG9hZC9kYXRhYmFzZSdcbmltcG9ydCB0eXBlIHsgU2FuaXRpemVkQ29sbGVjdGlvbkNvbmZpZyB9IGZyb20gJ3BheWxvYWQvdHlwZXMnXG5cbmltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSdcbmltcG9ydCBtb25nb29zZUFnZ3JlZ2F0ZVBhZ2luYXRlIGZyb20gJ21vbmdvb3NlLWFnZ3JlZ2F0ZS1wYWdpbmF0ZS12MidcbmltcG9ydCBwYWdpbmF0ZSBmcm9tICdtb25nb29zZS1wYWdpbmF0ZS12MidcbmltcG9ydCB7XG4gIGJ1aWxkVmVyc2lvbkNvbGxlY3Rpb25GaWVsZHMsXG4gIGJ1aWxkVmVyc2lvbkdsb2JhbEZpZWxkcyxcbiAgZ2V0VmVyc2lvbnNNb2RlbE5hbWUsXG59IGZyb20gJ3BheWxvYWQvdmVyc2lvbnMnXG5cbmltcG9ydCB0eXBlIHsgTW9uZ29vc2VBZGFwdGVyIH0gZnJvbSAnLidcbmltcG9ydCB0eXBlIHsgQ29sbGVjdGlvbk1vZGVsIH0gZnJvbSAnLi90eXBlcydcblxuaW1wb3J0IGJ1aWxkQ29sbGVjdGlvblNjaGVtYSBmcm9tICcuL21vZGVscy9idWlsZENvbGxlY3Rpb25TY2hlbWEnXG5pbXBvcnQgeyBidWlsZEdsb2JhbE1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvYnVpbGRHbG9iYWxNb2RlbCdcbmltcG9ydCBidWlsZFNjaGVtYSBmcm9tICcuL21vZGVscy9idWlsZFNjaGVtYSdcbmltcG9ydCBnZXRCdWlsZFF1ZXJ5UGx1Z2luIGZyb20gJy4vcXVlcmllcy9idWlsZFF1ZXJ5J1xuXG5leHBvcnQgY29uc3QgaW5pdDogSW5pdCA9IGFzeW5jIGZ1bmN0aW9uIGluaXQodGhpczogTW9uZ29vc2VBZGFwdGVyKSB7XG4gIHRoaXMucGF5bG9hZC5jb25maWcuY29sbGVjdGlvbnMuZm9yRWFjaCgoY29sbGVjdGlvbjogU2FuaXRpemVkQ29sbGVjdGlvbkNvbmZpZykgPT4ge1xuICAgIGNvbnN0IHNjaGVtYSA9IGJ1aWxkQ29sbGVjdGlvblNjaGVtYShjb2xsZWN0aW9uLCB0aGlzLnBheWxvYWQuY29uZmlnKVxuXG4gICAgaWYgKGNvbGxlY3Rpb24udmVyc2lvbnMpIHtcbiAgICAgIGNvbnN0IHZlcnNpb25Nb2RlbE5hbWUgPSBnZXRWZXJzaW9uc01vZGVsTmFtZShjb2xsZWN0aW9uKVxuXG4gICAgICBjb25zdCB2ZXJzaW9uQ29sbGVjdGlvbkZpZWxkcyA9IGJ1aWxkVmVyc2lvbkNvbGxlY3Rpb25GaWVsZHMoY29sbGVjdGlvbilcblxuICAgICAgY29uc3QgdmVyc2lvblNjaGVtYSA9IGJ1aWxkU2NoZW1hKHRoaXMucGF5bG9hZC5jb25maWcsIHZlcnNpb25Db2xsZWN0aW9uRmllbGRzLCB7XG4gICAgICAgIGRpc2FibGVVbmlxdWU6IHRydWUsXG4gICAgICAgIGRyYWZ0c0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5pbWl6ZTogZmFsc2UsXG4gICAgICAgICAgdGltZXN0YW1wczogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9KVxuXG4gICAgICB2ZXJzaW9uU2NoZW1hLnBsdWdpbjxhbnksIFBhZ2luYXRlT3B0aW9ucz4ocGFnaW5hdGUsIHsgdXNlRXN0aW1hdGVkQ291bnQ6IHRydWUgfSkucGx1Z2luKFxuICAgICAgICBnZXRCdWlsZFF1ZXJ5UGx1Z2luKHtcbiAgICAgICAgICBjb2xsZWN0aW9uU2x1ZzogY29sbGVjdGlvbi5zbHVnLFxuICAgICAgICAgIHZlcnNpb25zRmllbGRzOiB2ZXJzaW9uQ29sbGVjdGlvbkZpZWxkcyxcbiAgICAgICAgfSksXG4gICAgICApXG5cbiAgICAgIGlmIChjb2xsZWN0aW9uLnZlcnNpb25zPy5kcmFmdHMpIHtcbiAgICAgICAgdmVyc2lvblNjaGVtYS5wbHVnaW4obW9uZ29vc2VBZ2dyZWdhdGVQYWdpbmF0ZSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgbW9kZWwgPSBtb25nb29zZS5tb2RlbChcbiAgICAgICAgdmVyc2lvbk1vZGVsTmFtZSxcbiAgICAgICAgdmVyc2lvblNjaGVtYSxcbiAgICAgICAgdGhpcy5hdXRvUGx1cmFsaXphdGlvbiA9PT0gdHJ1ZSA/IHVuZGVmaW5lZCA6IHZlcnNpb25Nb2RlbE5hbWUsXG4gICAgICApIGFzIENvbGxlY3Rpb25Nb2RlbFxuICAgICAgLy8gdGhpcy5wYXlsb2FkLnZlcnNpb25zW2NvbGxlY3Rpb24uc2x1Z10gPSBtb2RlbDtcbiAgICAgIHRoaXMudmVyc2lvbnNbY29sbGVjdGlvbi5zbHVnXSA9IG1vZGVsXG4gICAgfVxuXG4gICAgY29uc3QgbW9kZWwgPSBtb25nb29zZS5tb2RlbChcbiAgICAgIGNvbGxlY3Rpb24uc2x1ZyxcbiAgICAgIHNjaGVtYSxcbiAgICAgIHRoaXMuYXV0b1BsdXJhbGl6YXRpb24gPT09IHRydWUgPyB1bmRlZmluZWQgOiBjb2xsZWN0aW9uLnNsdWcsXG4gICAgKSBhcyBDb2xsZWN0aW9uTW9kZWxcbiAgICB0aGlzLmNvbGxlY3Rpb25zW2NvbGxlY3Rpb24uc2x1Z10gPSBtb2RlbFxuXG4gICAgLy8gVFMgZXhwZWN0IGVycm9yIG9ubHkgbmVlZGVkIHVudGlsIHdlIGxhdW5jaCAyLjAuMFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbiAgICB0aGlzLnBheWxvYWQuY29sbGVjdGlvbnNbY29sbGVjdGlvbi5zbHVnXSA9IHtcbiAgICAgIGNvbmZpZzogY29sbGVjdGlvbixcbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgbW9kZWwgPSBidWlsZEdsb2JhbE1vZGVsKHRoaXMucGF5bG9hZC5jb25maWcpXG4gIHRoaXMuZ2xvYmFscyA9IG1vZGVsXG5cbiAgdGhpcy5wYXlsb2FkLmNvbmZpZy5nbG9iYWxzLmZvckVhY2goKGdsb2JhbCkgPT4ge1xuICAgIGlmIChnbG9iYWwudmVyc2lvbnMpIHtcbiAgICAgIGNvbnN0IHZlcnNpb25Nb2RlbE5hbWUgPSBnZXRWZXJzaW9uc01vZGVsTmFtZShnbG9iYWwpXG5cbiAgICAgIGNvbnN0IHZlcnNpb25HbG9iYWxGaWVsZHMgPSBidWlsZFZlcnNpb25HbG9iYWxGaWVsZHMoZ2xvYmFsKVxuXG4gICAgICBjb25zdCB2ZXJzaW9uU2NoZW1hID0gYnVpbGRTY2hlbWEodGhpcy5wYXlsb2FkLmNvbmZpZywgdmVyc2lvbkdsb2JhbEZpZWxkcywge1xuICAgICAgICBkaXNhYmxlVW5pcXVlOiB0cnVlLFxuICAgICAgICBkcmFmdHNFbmFibGVkOiB0cnVlLFxuICAgICAgICBpbmRleFNvcnRhYmxlRmllbGRzOiB0aGlzLnBheWxvYWQuY29uZmlnLmluZGV4U29ydGFibGVGaWVsZHMsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBtaW5pbWl6ZTogZmFsc2UsXG4gICAgICAgICAgdGltZXN0YW1wczogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9KVxuXG4gICAgICB2ZXJzaW9uU2NoZW1hXG4gICAgICAgIC5wbHVnaW48YW55LCBQYWdpbmF0ZU9wdGlvbnM+KHBhZ2luYXRlLCB7IHVzZUVzdGltYXRlZENvdW50OiB0cnVlIH0pXG4gICAgICAgIC5wbHVnaW4oZ2V0QnVpbGRRdWVyeVBsdWdpbih7IHZlcnNpb25zRmllbGRzOiB2ZXJzaW9uR2xvYmFsRmllbGRzIH0pKVxuXG4gICAgICBjb25zdCB2ZXJzaW9uc01vZGVsID0gbW9uZ29vc2UubW9kZWwoXG4gICAgICAgIHZlcnNpb25Nb2RlbE5hbWUsXG4gICAgICAgIHZlcnNpb25TY2hlbWEsXG4gICAgICAgIHZlcnNpb25Nb2RlbE5hbWUsXG4gICAgICApIGFzIENvbGxlY3Rpb25Nb2RlbFxuICAgICAgdGhpcy52ZXJzaW9uc1tnbG9iYWwuc2x1Z10gPSB2ZXJzaW9uc01vZGVsXG4gICAgfVxuICB9KVxufVxuIl0sIm5hbWVzIjpbImluaXQiLCJwYXlsb2FkIiwiY29uZmlnIiwiY29sbGVjdGlvbnMiLCJmb3JFYWNoIiwiY29sbGVjdGlvbiIsInNjaGVtYSIsImJ1aWxkQ29sbGVjdGlvblNjaGVtYSIsInZlcnNpb25zIiwidmVyc2lvbk1vZGVsTmFtZSIsImdldFZlcnNpb25zTW9kZWxOYW1lIiwidmVyc2lvbkNvbGxlY3Rpb25GaWVsZHMiLCJidWlsZFZlcnNpb25Db2xsZWN0aW9uRmllbGRzIiwidmVyc2lvblNjaGVtYSIsImJ1aWxkU2NoZW1hIiwiZGlzYWJsZVVuaXF1ZSIsImRyYWZ0c0VuYWJsZWQiLCJvcHRpb25zIiwibWluaW1pemUiLCJ0aW1lc3RhbXBzIiwicGx1Z2luIiwicGFnaW5hdGUiLCJ1c2VFc3RpbWF0ZWRDb3VudCIsImdldEJ1aWxkUXVlcnlQbHVnaW4iLCJjb2xsZWN0aW9uU2x1ZyIsInNsdWciLCJ2ZXJzaW9uc0ZpZWxkcyIsImRyYWZ0cyIsIm1vbmdvb3NlQWdncmVnYXRlUGFnaW5hdGUiLCJtb2RlbCIsIm1vbmdvb3NlIiwiYXV0b1BsdXJhbGl6YXRpb24iLCJ1bmRlZmluZWQiLCJidWlsZEdsb2JhbE1vZGVsIiwiZ2xvYmFscyIsImdsb2JhbCIsInZlcnNpb25HbG9iYWxGaWVsZHMiLCJidWlsZFZlcnNpb25HbG9iYWxGaWVsZHMiLCJpbmRleFNvcnRhYmxlRmllbGRzIiwidmVyc2lvbnNNb2RlbCJdLCJtYXBwaW5ncyI6IkFBQUEsb0NBQW9DOzs7OytCQXNCdkJBOzs7ZUFBQUE7OztpRUFqQlE7b0ZBQ2lCOzJFQUNqQjswQkFLZDs4RUFLMkI7a0NBQ0Q7b0VBQ1Q7bUVBQ1E7Ozs7OztBQUV6QixNQUFNQSxPQUFhLGVBQWVBO0lBQ3ZDLElBQUksQ0FBQ0MsT0FBTyxDQUFDQyxNQUFNLENBQUNDLFdBQVcsQ0FBQ0MsT0FBTyxDQUFDLENBQUNDO1FBQ3ZDLE1BQU1DLFNBQVNDLElBQUFBLDhCQUFxQixFQUFD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
