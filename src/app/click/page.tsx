"use client"
import { useEffect, useState } from "react";

type Character = {
  id: number;
  name: string;
  status: string;
  image: string;
};

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://rickandmortyapi.com/api/character");
        if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
        const data = await res.json();
        setCharacters(data.results);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % characters.length);
  };

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;
  if (error) return <p>{error}</p>;
  if (characters.length === 0) return <p>ไม่พบข้อมูลตัวละคร</p>;

  const character = characters[currentIndex];

  return (
    <main>
      <h1>Rick and Morty Character</h1>
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>Status: {character.status}</p>

      <button onClick={handleNext}>
        ตัวถัดไป (ID: {character.id + 1})
      </button>
    </main>
  );
}
