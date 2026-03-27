"use client";

export const dynamic = "force-dynamic";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SoundResponse } from "@/app/interfaces/soundResponse";


// 🎨 Styled components (only important ones)
const Wrapper = styled.div<{ color?: string }>`
    min-height: 100vh;
    background-color: ${({ color }) => color};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
`;

const StyledLink = styled(Link)`
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 0.5rem 0.9rem;
    background: rgba(255, 255, 255, 0.8);
    font-weight: bold;
    font-size: 0.9rem;
    text-decoration: none;
`;



const Title = styled.h1`
    font-size: clamp(2rem, 6vw, 3.5rem);
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    color: white;
    text-align: center;
`;

const AudioContainer = styled.div`
    padding: 1.25rem 1.75rem;
    border-radius: 1.5rem;
    background: rgba(255, 255, 255, 0.85);
    max-width: 90vw;
`;

const StyledAudio = styled.audio`
    width: min(22rem, 90vw);
`;

const LoadingOrErrorStyler = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: bold;
`;

export default function SoundPage() {

    // I was confused by the dynamic [folder] naming convention and was
    // crammed on time, so i read the Next.js docs and found useSearchparams
    // a few tabs below useParams (that was used in class) and used this instead
    // of using dynamic routing by getting query parameters directly here

    // Docs said to do .get(thing after ?) to get its value, so i do that here
    const params = useSearchParams();
    const emotion = params.get("emotion");

    const [data, setData] = useState<SoundResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchSoundWrapper() {
            if (!emotion) {
                setLoading(false);
                setError(true);
                return;
            }

            // Valid emotion, now start loading the data
            setLoading(true);
            setError(false);

            fetch(`/api/getSound?emotion=${emotion}`)

                //decide if response was valid or not
                .then((res) => {
                    if (!res.ok) throw new Error();
                    return res.json();
                })

                // set states of data/loading/error based on what is returned from fct
                .then((data) => {
                    setData(data);
                    setLoading(false);
                })
                .catch(() => {
                    setError(true);
                    setLoading(false);
                });
            }
            // call the function, wrapped async so its valid inside useEffect
        void fetchSoundWrapper();

        }, [emotion]);

    if (loading) return <LoadingOrErrorStyler>Loading...</LoadingOrErrorStyler>;
    if (error)
    {
        return (
            <>
                <LoadingOrErrorStyler>Something went wrong! Try again.</LoadingOrErrorStyler>
                <StyledLink href={`/`}>Go Home</StyledLink>
            </>
        )
    }

    return (
        <Wrapper color={data?.color}>
            <StyledLink href={`/`}>Go Home</StyledLink>

            <Title>{emotion}</Title>

            {data && (
                <AudioContainer>
                    <StyledAudio src={data.url} controls autoPlay />
                </AudioContainer>
            )}
        </Wrapper>
    );
}