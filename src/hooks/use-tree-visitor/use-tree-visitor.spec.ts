import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Container, ContainerInstance, Token } from '@typed-inject/injector';
import { ContainerTreeVisitor } from '@typed-inject/injector/types/interfaces/tree-visitor.interface';
import { useTreeVisitor } from './use-tree-visitor';

describe('useTreeVisitor()', () => {
    class MyTreeVisitor implements ContainerTreeVisitor {
        disposed = false;
        dispose = jest.fn().mockImplementation(() => (this.disposed = true));
        visitContainer = jest.fn().mockReturnValue(true);
    }

    it('should attach a tree visitor to the container', () => {
        const visitor = new MyTreeVisitor();
        const { result } = renderHook(() => useTreeVisitor(visitor));

        act(() => {
            const { current } = result;

            expect(current).toBeInstanceOf(Array);
            const [detach, isAttached] = current;

            expect(detach).toBeInstanceOf(Function);
            expect(isAttached).toBe(true);

            expect(visitor.dispose).not.toHaveBeenCalled();
            expect(visitor.visitContainer).toHaveBeenCalled();
            expect(visitor.visitContainer).toHaveBeenCalledWith(Container);
        });
    });
});