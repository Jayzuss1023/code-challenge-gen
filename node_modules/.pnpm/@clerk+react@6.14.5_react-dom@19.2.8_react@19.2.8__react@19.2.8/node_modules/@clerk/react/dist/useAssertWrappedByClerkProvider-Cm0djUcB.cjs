let _clerk_shared_error = require("@clerk/shared/error");
let _clerk_shared_react = require("@clerk/shared/react");

//#region src/errors/errorThrower.ts
const errorThrower = (0, _clerk_shared_error.buildErrorThrower)({ packageName: "@clerk/react" });
/**
* Overrides options of the internal errorThrower (eg setting packageName prefix).
*
* @internal
*/
function setErrorThrowerOptions(options) {
	errorThrower.setMessages(options).setPackageName(options);
}

//#endregion
//#region src/contexts/IsomorphicClerkContext.tsx
const useIsomorphicClerkContext = _clerk_shared_react.useClerkInstanceContext;

//#endregion
//#region src/hooks/useAssertWrappedByClerkProvider.ts
const useAssertWrappedByClerkProvider = (source) => {
	(0, _clerk_shared_react.useAssertWrappedByClerkProvider)(() => {
		errorThrower.throwMissingClerkProviderError({ source });
	});
};

//#endregion
Object.defineProperty(exports, 'errorThrower', {
  enumerable: true,
  get: function () {
    return errorThrower;
  }
});
Object.defineProperty(exports, 'setErrorThrowerOptions', {
  enumerable: true,
  get: function () {
    return setErrorThrowerOptions;
  }
});
Object.defineProperty(exports, 'useAssertWrappedByClerkProvider', {
  enumerable: true,
  get: function () {
    return useAssertWrappedByClerkProvider;
  }
});
Object.defineProperty(exports, 'useIsomorphicClerkContext', {
  enumerable: true,
  get: function () {
    return useIsomorphicClerkContext;
  }
});
//# sourceMappingURL=useAssertWrappedByClerkProvider-Cm0djUcB.cjs.map