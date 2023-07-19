import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Container, ContainerInstance, Token } from '@typed-inject/injector';
import { useManyServices, useManyServicesOrNull } from './use-many-services';

describe('Many Services Hooks', () => {
    const NAME = new Token<string>();
    const expectedValues = ['Joanna', 'Jane', 'Jacqueline'];

    beforeAll(() => {
        if (Container.has(NAME)) {
            Container.remove(NAME);
        }

        expectedValues.forEach(name => {
            Container.set({ id: NAME, value: name, multiple: true, dependencies: [ ] });
        });
    });

    describe('useManyServices()', () => {
        it('should work with many services', () => {
            const { result } = renderHook(() => useManyServices(NAME));
    
            act(() => {
                const { current } = result;
                expect(current).toMatchObject(expectedValues);
            });
        });

        it('should throw if the symbol could not be found', () => {
            const { result } = renderHook(() => useManyServices('test'));
    
            act(() => {
                const { error } = result;
                expect(error).toBeInstanceOf(Error);
            });
        });

        it('should accept a container argument', () => {
            const newContainer = ContainerInstance.of(Symbol(), null);
            newContainer.set({ id: NAME, value: 'Julia', multiple: true, dependencies: [ ] });
            const { result } = renderHook(() => useManyServices(NAME, newContainer));
    
            act(() => {
                const { current } = result;
                expect(current).toMatchObject(['Julia']);
            });
        });
    });

    describe('useManyServicesOrNull()', () => {
        it('should work with many services', () => {
            const { result } = renderHook(() => useManyServicesOrNull(NAME));
    
            act(() => {
                const { current } = result;
                expect(current).toMatchObject(expectedValues);
            });
        });

        it('should return null if the symbol could not be found', () => {
            const { result } = renderHook(() => useManyServicesOrNull('test'));
    
            act(() => {
                const { current } = result;
                expect(current).toBeNull();
            });
        });

        it('should accept a container argument', () => {
            const newContainer = ContainerInstance.of(Symbol(), null);
            newContainer.set({ id: NAME, value: 'Julia', multiple: true, dependencies: [ ] });
            const { result } = renderHook(() => useManyServicesOrNull(NAME, newContainer));
    
            act(() => {
                const { current } = result;
                expect(current).toMatchObject(['Julia']);
            });
        });
    });

    // TODO: test deps argument
});