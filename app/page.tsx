"use client";

import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";

// Record mapping color to their string value
const emotionColors: Record<string, string> = {
    sad: "#4A90E2",
    happy: "#FFD93D",
    scared: "#9B59B6",
    sick: "#2ECC71",
    embarrassed: "#FF6FA5",
};

// Array for looping in printing
const emotionList = ["sad", "happy", "scared", "sick", "embarrassed"];

const PageWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;


const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem 0;
    font-weight: bold;
`;

const ContentWrapper = styled.div`
    flex: 1; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: clamp(2rem, 2.5rem, 3rem);
    margin: 0;
    padding: 0.5rem;
    border-radius: 25px;

    background: linear-gradient(
    90deg,
    #4A90E2,
    #FFD93D,
    #9B59B6,
    #2ECC71,
    #FF6FA5
    );
`;

const Subtitle = styled.h3`
    font-weight: normal;
    margin-bottom: 3rem;
    text-decoration: underline;
    font-size: clamp(0.9rem, 1.5rem, 1.7rem);
`;

const EmotionDisplay = styled.h3<{ color: string }>`
    margin: 0.5rem 0;
    font-size: clamp(0.8rem, 1.2rem, 1.5rem);
    font-weight: bold;
    color: ${({ color }) => color};
`;

const ButtonGroup = styled.div`
    display: flex;
    margin: 1rem 0;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
`;

const PillButton = styled.button<{ color: string }>`
    font-size: clamp(0.8rem, 1.3vw, 1.5rem);
    padding: 10px 20px;
    border-radius: 999px;
    border: 4px solid ${({ color }) => color};
    background: white;
    font-weight: bold;

    &:hover {
        transform: scale(1.05);
    }
`;

const LinkButton = styled(Link)`
    margin: 1rem;
    padding: 10px 20px;
    font-size: clamp(0.8rem, 1.3vw, 1.5rem);

    border: 2px solid black;
    border-radius: 8px;
    color: black;
    font-weight: bold;
    text-decoration: none;

    &:hover {
        transform: scale(1.05);
    }
`;

export default function Home() {
    const [emotion, setEmotion] = useState("");

    return (
        <PageWrapper>
            <TitleWrapper>
                <Title>Mood → Sound Picker!</Title>
                <Subtitle>Enter your mood and get a sound for it!</Subtitle>
            </TitleWrapper>

            <ContentWrapper>
                <EmotionDisplay color={emotionColors[emotion]}>
                    Your current emotion: {emotion.toUpperCase() || "None" }
                </EmotionDisplay>

                <ButtonGroup>
                    {emotionList.map((e) => (
                        <PillButton
                            key={e}
                            color={emotionColors[e]}
                            onClick={() => setEmotion(e)}
                        >
                            {e.toUpperCase()}
                        </PillButton>
                    ))}
                </ButtonGroup>

                {emotion && (
                    <LinkButton href={`/sound?emotion=${emotion}`}>
                        Give me a {emotion} sound!
                    </LinkButton>
                )}
            </ContentWrapper>
        </PageWrapper>
    );
}