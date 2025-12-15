'use client';
import { Suspense } from 'react';
import BookCard3D from './BookCard3D';

const LibraryShowcase = () => {
    const books = [
        { id: 1, title: "The Great Gatsby", color: "#F59E0B", pos: [-2, 0, 0] },
        { id: 2, title: "1984", color: "#EF4444", pos: [-0.7, 0, 0] },
        { id: 3, title: "Brave New Book", color: "#3B82F6", pos: [0.7, 0, 0] },
        { id: 4, title: "Dune", color: "#10B981", pos: [2, 0, 0] },
        { id: 5, title: "Foundation", color: "#8B5CF6", pos: [0, 1.5, -1] },
    ];

    return (
        <group position={[0, -0.5, 0]}>
            <mesh position={[0, -0.6, 0]} receiveShadow>
                <cylinderGeometry args={[4, 4, 0.2, 32]} />
                <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* @ts-ignore */}
            {books.map(book => (
                // @ts-ignore
                <BookCard3D key={book.id} position={book.pos} color={book.color} title={book.title} />
            ))}
        </group>
    );
};

export default LibraryShowcase;
