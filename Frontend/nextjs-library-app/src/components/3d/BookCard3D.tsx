'use client';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';

interface BookCard3DProps {
    position: [number, number, number];
    color?: string;
    title?: string;
    onClick?: () => void;
}

const BookCard3D = ({ position, color = '#3b82f6', title = 'Book', onClick }: BookCard3DProps) => {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Floating effect
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;

            // Hover rotation
            if (hovered) {
                meshRef.current.rotation.y += delta * 2;
            } else {
                // Return to roughly original rotation or keep slight spin
                meshRef.current.rotation.y += delta * 0.2;
            }
        }
    });

    return (
        <group position={position}>
            <mesh
                ref={meshRef}
                onClick={onClick}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                castShadow
                receiveShadow
                scale={hovered ? 1.1 : 1}
            >
                <boxGeometry args={[0.7, 1, 0.15]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
            </mesh>
            <Text
                position={[0, 0, 0.08]}
                fontSize={0.12}
                color="white"
                anchorX="center"
                anchorY="middle"
                maxWidth={0.6}
                textAlign="center"
            >
                {title}
            </Text>
        </group>
    );
};

export default BookCard3D;
