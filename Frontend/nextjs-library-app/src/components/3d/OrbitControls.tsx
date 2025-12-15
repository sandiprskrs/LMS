'use client';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';

interface OrbitControlsProps {
    enableZoom?: boolean;
    autoRotate?: boolean;
}

const OrbitControls = ({ enableZoom = true, autoRotate = false }: OrbitControlsProps) => {
    return (
        <DreiOrbitControls
            enableZoom={enableZoom}
            autoRotate={autoRotate}
            enableDamping={true}
            dampingFactor={0.05}
        />
    );
};

export default OrbitControls;
