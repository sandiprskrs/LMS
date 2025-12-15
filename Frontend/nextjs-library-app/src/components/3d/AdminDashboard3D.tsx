'use client';
import { Text } from '@react-three/drei';

const AdminDashboard3D = () => {
    const stats = [
        { label: "Total Books", value: "1,240", pos: [-3, 0, 0], color: "#3b82f6" },
        { label: "Issued", value: "320", pos: [-1, 0, 0], color: "#f59e0b" },
        { label: "Overdue", value: "45", pos: [1, 0, 0], color: "#ef4444" },
        { label: "Reserved", value: "12", pos: [3, 0, 0], color: "#10b981" },
    ];

    return (
        <group>
            {stats.map((stat, i) => (
                <group key={i} position={stat.pos as [number, number, number]}>
                    <mesh position={[0, 0, -0.5]}>
                        <boxGeometry args={[1.8, 1.2, 0.2]} />
                        <meshStandardMaterial color={stat.color} opacity={0.8} transparent />
                    </mesh>
                    <Text position={[0, 0.2, 0]} fontSize={0.3} color="white">
                        {stat.value}
                    </Text>
                    <Text position={[0, -0.3, 0]} fontSize={0.15} color="white">
                        {stat.label}
                    </Text>
                </group>
            ))}
            <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[10, 5]} />
                <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </mesh>
        </group>
    );
};

export default AdminDashboard3D;
