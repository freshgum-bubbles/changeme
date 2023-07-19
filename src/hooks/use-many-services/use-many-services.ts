import defaultContainer, { ContainerInstance, ServiceIdentifier } from "@typed-inject/injector";
import { useMemo } from "react";

/**
 * Use all services registered with `{ multiple: true }` with the given identifier.
 * @beta
 * 
 * @example
 * ```tsx
 * function MyComponent () {
 *   const databaseServices = useManyServices(DatabaseService);
 * 
 *   useEffect(() => {
 *     databaseServices.forEach(service => { });
 *   }, [databaseServices]);
 * }
 * ```
 * 
 * @see {@link useManyServicesOrNull}
 * @see {@link ContainerInstance.getMany}
 * 
 * @group React Hooks
 * 
 * @throws Error
 * This exception is thrown when the service cannot be found.
 * 
 * @returns
 * All instances of the given identifier within the provided container.
 */
export function useManyServices<T = unknown> (id: ServiceIdentifier<T>, container = defaultContainer, deps: any[] = [ ]) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => container.getMany<T>(id), [id, container, ...deps]);
}

/**
 * Use all services registered with `{ multiple: true }` with the given identifier,
 * or `null` if none could be found.
 * @beta
 * 
 * @example
 * ```tsx
 * function MyComponent () {
 *   const databaseServices = useManyServicesOrNull(DatabaseService);
 * 
 *   useEffect(() => {
 *     if (databaseServices !== null) {
 *       databaseServices.forEach(service => { });
 *     }
 *   }, [databaseServices]);
 * }
 * ```
 * 
 * @see {@link useManyServices}
 * @see {@link ContainerInstance.getManyOrNull}
 * 
 * @group React Hooks
 * 
 * @throws Error
 * This exception is thrown when the service cannot be found.
 * 
 * @returns
 * All instances of the given identifier within the provided container,
 * or `null` if none could be found.
 */
export function useManyServicesOrNull<T = unknown> (id: ServiceIdentifier<T>, container = defaultContainer, deps: any[] = [ ]) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => container.getManyOrNull<T>(id), [id, container, ...deps]);
}
