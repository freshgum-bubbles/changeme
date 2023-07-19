import { ServiceIdentifier, Container } from "@typed-inject/injector";
import { useMemo } from "react";

/**
 * Get a service with the specified identifier.
 * @beta

 * @param id The ID of the service to retrieve.
 * @param container The container to retrieve the service from.  By default, this is the default container.
 * @param deps When any of these values change, the service is re-retrieved.  By default, this is empty.
 * 
 * @example
 * Here is an example of how to utilise this function:
 * ```tsx
 * function MyComponent () {
 *   const databaseService = useService(DatabaseService);
 * 
 *   useEffect(() => {
 *     // do something with databaseService
 *   }, [ ]);
 * }
 * ```
 * 
 * @see {@link useServiceOrNull}
 * 
 * @group React Hooks
 * 
 * @throws Error
 * This exception is thrown by {@link ContainerInstance.get} if the
 * specified service does not exist.
 * 
 * @returns
 * The value of the given identifier within the container.
 */
export function useService<T = unknown> (id: ServiceIdentifier<T>, container = Container, deps: any[] = [ ]) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => container.get<T>(id), [id, container, ...deps]);
}

/**
 * Get a service with the specified identifier, or return
 * `null` if it does not exist within the container.
 * @beta
 * 
 * @remarks
 * If the service cannot be found, an exception is thrown.
 * For a variant which throws an error if the service cannot be found, use {@link useService}.
 * 
 * @example
 * Here is an example of how to utilise this function:
 * ```tsx
 * function MyComponent () {
 *   const databaseService = useServiceOrNull(DatabaseService);
 * 
 *   useEffect(() => {
 *     if (databaseService !== null) {
 *       // do something with databaseService
 *     }
 *   }, [databaseService]);
 * }
 * ```
 * 
 * @see {@link useService}
 * 
 * @group React Hooks
 * 
 * @param id The ID of the service to retrieve.
 * @param container The container to retrieve the service from.  By default, this is the default container.
 * @param deps When any of these values change, the service is re-retrieved.  By default, this is empty.
 * 
 * @returns
 * The value of the given identifier within the container,
 * or `null` if it does not exist.
 */
export function useServiceOrNull<T = unknown> (id: ServiceIdentifier<T>, container = Container, deps: any[] = [ ]) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => container.getOrNull<T>(id), [id, container, ...deps]);
}

