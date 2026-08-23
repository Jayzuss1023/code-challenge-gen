import { buildErrorThrower } from "@clerk/shared/error";
import { useAssertWrappedByClerkProvider, useClerkInstanceContext } from "@clerk/shared/react";

//#region src/errors/errorThrower.ts
const errorThrower = buildErrorThrower({ packageName: "@clerk/react" });
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
const useIsomorphicClerkContext = useClerkInstanceContext;

//#endregion
//#region src/hooks/useAssertWrappedByClerkProvider.ts
const useAssertWrappedByClerkProvider$1 = (source) => {
	useAssertWrappedByClerkProvider(() => {
		errorThrower.throwMissingClerkProviderError({ source });
	});
};

//#endregion
export { setErrorThrowerOptions as i, useIsomorphicClerkContext as n, errorThrower as r, useAssertWrappedByClerkProvider$1 as t };
//# sourceMappingURL=useAssertWrappedByClerkProvider-GaNwZpWo.mjs.map