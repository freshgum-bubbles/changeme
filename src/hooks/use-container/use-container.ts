import { ContainerIdentifier, ContainerInstance, CreateContainerOptions, Container } from "@typed-inject/injector";
import { useMemo } from "react";

/**
 * Get or create a container with the specified container.
 * @beta
 * 
 * @param id The ID of the container to get.
 * @param parent The parent of the new container.
 * @param options The options to provide to the container creation function.
 * 
 * @example
 * Here's an example without options:
 * ```ts
 * function MyComponent () {
 *   const container = useContainer('my-new-container');
 * 
 *   useEffect(() => {
 *     // 'container' will never change.
 *   }, [container]);
 * }
 * ```
 * 
 * @example
 * Here's an example with {@link CreateContainerOptions}:
 * ```ts
 * function MyComponent () {
 *   const container = useContainer('my-new-container', parentContainer, {
 *     onConflict: 'throw',
 *     // ...
 *   });
 * 
 *   useEffect(() => {
 *     // 'container' will never change.
 *   }, [container]);
 * }
 * ```
 * 
 * @remarks
 * If the container already exists, its instance is returned.
 * If it does not, a new container with the ID is created (which is then returned).
 * 
 * @see {@link ContainerInstance}
 * @see {@link CreateContainerOptions}
 * 
 * @group React Hooks
 * 
 * @returns
 * The newly-created, or pre-existing container.
 * This will be an instance of {@link ContainerInstance}.
 */
export function useContainer (id: ContainerIdentifier, parent: ContainerInstance | null = Container, options?: CreateContainerOptions) {
    return useMemo(() => {
        return ContainerInstance.of(id, parent, options);
    }, [id, parent, options]);
}
