"use client"
import { useEffect, useState } from "react";

export default function Home() {
  type Character = {
    id: number,
    name: string,
    status: string,
    image: string
  }
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch("https://rickandmortyapi.com/api/character");
        if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
        const data = await res.json();
        setCharacters(data.results);
        setError(null);
      }
      catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        }
      }
      finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [])

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;
  if (error) return <p>{error}</p>;

  return (
      <main>
        <h1>Rick and Morty character</h1>
        {characters.map(i => (
          <li key={i.id}>{i.name} - {i.status}</li>
        ))}
      </main>
  );
}
