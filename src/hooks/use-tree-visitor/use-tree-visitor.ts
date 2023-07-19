import { ContainerInstance } from "@typed-inject/injector";
import { defaultContainer } from "@typed-inject/injector/types/container-instance.class";
import { ContainerTreeVisitor } from "@typed-inject/injector/types/interfaces/tree-visitor.interface";
import { useCallback, useEffect, useRef } from "react";

export function useTreeVisitor (visitor: ContainerTreeVisitor, container: ContainerInstance = defaultContainer) {
    /** Use a ref to avoid unnecessary re-renders of the host component. */
    const isAttachedRef = useRef<boolean>(false);

    const detachCallback = useCallback(() => {
        /**
         * Only detach the visitor if we *think* it's attached.
         * There's a discrepancy here because, when the visitor
         * was attached, it may have returned false.
         */
        if (isAttachedRef.current) {
            isAttachedRef.current = false;
            container.detachTreeVisitor(visitor);
        }
    }, [container, visitor]);

    useEffect(() => {
        container.acceptTreeVisitor(visitor);

        return () => detachCallback();
    }, [visitor, container, detachCallback]);

    return [detachCallback, isAttachedRef.current] as const;
}
