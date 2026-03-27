import { NextResponse } from "next/server";
import { Emotion, EmotionInfo } from "@/app/interfaces/emotion";


export const dynamic = "force-dynamic";
const API_KEY = process.env.FREESOUND_API_KEY;

export const emotionMap: Record<Emotion, EmotionInfo> = {
    sad: { index: 2, color: "#4A90E2" },
    happy: { index: 0, color: "#FFD93D" },
    scared: { index: 3, color: "#9B59B6" },
    sick: { index: 0, color: "#2ECC71" },
    embarrassed: { index: 0, color: "#FF6FA5" }
};

export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const emotion = searchParams.get("emotion");

    if (!emotion) {
        return NextResponse.json({ error: "No emotion provided" }, { status: 400 });
    }

    const res = await fetch(
        `https://freesound.org/apiv2/search/?query=${emotion}&fields=name,previews`,
        {
            headers: {
                Authorization: `Token ${API_KEY}`,
            },
        }
    );

    if (res.status !== 200) {
        return NextResponse.json({ error: "Failed to fetch sound" }, { status: 500 });
    }

    const data = await res.json();

    const emotionKey = emotion as Emotion;
    const info = emotionMap[emotionKey];

    const sound = data.results[info.index];

    if (!sound || !sound.previews) {
        return NextResponse.json({ error: "No valid sound found" }, { status: 404 });
    }

    return NextResponse.json({
        url: sound.previews["preview-hq-mp3"],
        color: info.color
    });
}