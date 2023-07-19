import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useService, useServiceOrNull } from './use-service';
import { Container, ContainerInstance, Token } from '@typed-inject/injector';

describe('Service Hooks', () => {
    const NAME = new Token<string>();
    const UNKNOWN_ID = new Token<never>();
    const expectedName = 'Joanna';
    beforeEach(() => Container.setValue(NAME, expectedName));

    describe('useService()', () => {
        it('should return the given service', () => {
            const { result } = renderHook(() => useService(NAME));

            act(() => {
                expect(result.current).toStrictEqual(expectedName);
            })
        });

        it('should throw if the service could not be found', () => {
            const { result } = renderHook(() => useService(UNKNOWN_ID));

            act(() => {
                expect(result.error).toBeInstanceOf(Error);
            });
        });

        it('should accept a container argument', () => {
            const newContainer = ContainerInstance.of(Symbol(), null);
            newContainer.setValue(NAME, 'Jane');

            // Set up a new container.
            const { result } = renderHook(() => useService(NAME, newContainer));

            act(() => {
                expect(result.current).toStrictEqual('Jane');
            });
        });
    });

    describe('useServiceOrNull()', () => {
        it('should return the given service', () => {
            const { result } = renderHook(() => useServiceOrNull(NAME));

            act(() => {
                expect(result.current).toStrictEqual(expectedName);
            });
        });

        it('should return null if the service cannot be found', () => {
            const { result } = renderHook(() => useServiceOrNull(UNKNOWN_ID));

            act(() => {
                expect(result.current).toStrictEqual(null);
            });
        });

        it('should accept a container argument', () => {
            const newContainer = ContainerInstance.of(Symbol(), null);
            newContainer.setValue(NAME, 'Jane');

            // Set up a new container.
            const { result } = renderHook(() => useServiceOrNull(NAME, newContainer));

            act(() => {
                expect(result.current).toStrictEqual('Jane');
            });
        });
    });
});

