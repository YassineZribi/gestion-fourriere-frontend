import { useEffect, useRef } from 'react';

function useEffectOnce(effect: () => void, cleanUp?: () => void) {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (!didMountRef.current) {
            // This will run only on the first render
            console.log('Component mounted');
            effect();
            didMountRef.current = true;
        }

        return () => cleanUp?.()
    }, [effect]);
}

export default useEffectOnce;