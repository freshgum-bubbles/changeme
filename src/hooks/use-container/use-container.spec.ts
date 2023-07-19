import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useContainer } from './use-container';
import { Container, ContainerInstance } from '@typed-inject/injector';

describe('useContainer()', () => {
    it('should use the provided container', () => {
        const containerID = Symbol();
        const newContainer = Container.ofChild(containerID);
        const { result } = renderHook(() => useContainer(containerID));
        
        act(() => {
            expect(result.current).toStrictEqual(newContainer);
        });
    });

    const randomContainer = ContainerInstance.of(Symbol(), null);

    it.each([
        // Test both the default case for the argument parameter,
        // alongside the instantiation of child and orphaned containers.
        { expectedParent: Container, parentArgument: undefined, name: '(parent arg not passed)' },
        { expectedParent: randomContainer, parentArgument: randomContainer, name: '(container passed)' },
        { expectedParent: undefined, parentArgument: null, name: '(orphaned)' },
    ])('should set the parent correctly $name', ({ parentArgument: parent, expectedParent }) => {
        const containerID = Symbol();
        const { result } = renderHook(() => useContainer(containerID, parent));

        act(() => {
            const { current } = result;
            expect(current).toBeInstanceOf(ContainerInstance);
            expect(current.id).toStrictEqual(containerID);
            expect(current.parent).toStrictEqual(expectedParent);
        });
    });

    it('should work with onFree', () => {
        const containerID = Symbol();
        const { result: freeResult } = renderHook(() => useContainer(containerID, Container, {
            onFree: 'null'
        }));

        act(() => {
            const { current } = freeResult;
            expect(current).toBeNull();
        });
    });

    it('should work with onConflict', () => {
        const containerID = Symbol();
        ContainerInstance.of(containerID);

        // Create a conflict with the default container:
        const { result: freeResult } = renderHook(() => useContainer(containerID, Container, {
            onConflict: 'null',
            conflictDefinition: 'rejectAll'
        }));

        act(() => {
            const { current } = freeResult;
            expect(current).toBeNull();
        });
    });
});