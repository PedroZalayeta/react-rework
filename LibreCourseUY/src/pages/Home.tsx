import { useEffect, useMemo, useState } from "react";
import BlurText from "../components/BlutText";
import Beams from "../components/Beams";
import RadialOrbitalTimeline from "../components/RadialOrbitalTimeline";
import WhyEnglishSection from "../components/WhyEnglishSection";
import FeaturesCards from "../components/FeaturesCards";
import { FeatureSteps } from "../components/ui/feature-section";
import { BackgroundPaths } from "../components/ui/background-paths";

interface CommitData {
    repo: string
    author: string
    message: string
    date: string
    relativeTime?: string
    summary?: string
    url?: string
    repoUrl?: string
}

function Home() {
    const [commit, setCommit] = useState<CommitData | null>(() => {
        if (typeof window === 'undefined') return null
        const cached = localStorage.getItem('lastCommit')
        return cached ? JSON.parse(cached) : null
    })
    const [error, setError] = useState<string>("")

    const summaryLines = commit?.summary?.split("\n") ?? []

    const backendUrl = useMemo(() => {
        const envUrl = import.meta.env.VITE_BACKEND_URL?.trim()
        if (envUrl) {
            return envUrl.replace(/\/$/, "")
        }

        if (import.meta.env.DEV) {
            return "http://localhost:6453"
        }

        if (typeof window !== "undefined") {
            return window.location.origin.replace(/\/$/, "")
        }

        return ""
    }, [])

    // fetch API
    useEffect(() => {
        let cancelled = false

        const loadCommit = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/last-commit`)
                const payload = await response.json().catch(() => ({}))

                if (!response.ok || !payload?.date) {
                    throw new Error(payload?.error || `Request failed with ${response.status}`)
                }

                if (!cancelled) {
                    setCommit(payload)
                    setError("")
                    localStorage.setItem('lastCommit', JSON.stringify(payload))
                }
            } catch (err: any) {
                console.error(err)
                if (!cancelled) {
                    setError(err?.message || "Could not load last contribution")
                }
            }
        }

        loadCommit()

        const interval = setInterval(loadCommit, 60_000)

        return () => {
            cancelled = true
            clearInterval(interval)
        }
    }, [backendUrl])


    return (
        <BackgroundPaths>
            <section className="hero-section">
                <Beams
                    beamWidth={2}
                    beamHeight={50}
                    beamNumber={20}
                    lightColor="#679ef8"
                    speed={1}
                    noiseIntensity={1}
                    scale={0.2}
                    rotation={45}
                />
                <div className="hero-title">
                    <BlurText
                        text="Welcome to LibreCourseUY"
                        delay={25}
                        animateBy="letters"
                        direction="top"
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white"
                    />
                    <BlurText
                        text="Open Source projects made in Uruguay"
                        delay={25}
                        animateBy="letters"
                        direction="bottom"
                        className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-500"
                    />
                </div>

                <div className="hero-buttons">
                    <button className="button-important">Start to Learn</button>
                    <button className="button-secondary">Start Contributing</button>
                </div>

                {commit ? (
                    <div className="hero-last-contribution">
                        <div>
                            {summaryLines[0] ?? `Last contribution ${commit.relativeTime ?? "just now"} ago`}
                        </div>

                        <div className="hero-commit-meta" style={{ pointerEvents: 'auto', position: 'relative', zIndex: 100 }}>
                            <a
                                href={`https://github.com/${commit.author}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="commit-link"
                                style={{ color: '#679ef8', textDecoration: 'none', cursor: 'pointer', display: 'inline-block', position: 'relative', zIndex: 101 }}
                            >
                                {commit.author}
                            </a>
                            {" in "}
                            <a
                                href={commit.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="commit-link"
                                style={{ color: '#679ef8', textDecoration: 'none', cursor: 'pointer', display: 'inline-block', position: 'relative', zIndex: 101 }}
                            >
                                {commit.repo}
                            </a>
                        </div>
                    </div>
                ) : error ? (
                    <div className="hero-last-contribution">
                        <div>{error}</div>
                    </div>
                ) : null}

            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-[#b29758] to-transparent opacity-50" />

            <section>
                <WhyEnglishSection />
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-[#b29758] to-transparent opacity-50" />

            <section>
                <FeaturesCards />
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-[#b29758] to-transparent opacity-50" />

            <section className="py-24" style={{ backgroundColor: 'transparent' }}>
                <FeatureSteps 
                    features={[
                        { 
                            step: 'Mission 1', 
                            title: 'Learn to use Git and GitHub professionally',
                            content: 'Master version control and collaboration workflows used by industry professionals.', 
                            image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2070&auto=format&fit=crop' 
                        },
                        { 
                            step: 'Mission 2',
                            title: 'Contribute to open source projects',
                            content: 'Gain real-world experience by contributing to meaningful open source projects.',
                            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop'
                        },
                        { 
                            step: 'Mission 3',
                            title: 'Build practical skills for your future career',
                            content: 'Develop the technical and soft skills employers are looking for.',
                            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop'
                        },
                        {
                            step: 'Mission 4',
                            title: 'Connect with other students',
                            content: 'Form study groups and build your professional network in tech.',
                            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop'
                        },
                    ]}
                    title="Our Mission"
                    autoPlayInterval={5000}
                />
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-[#b29758] to-transparent opacity-50" />

            <section>
                <RadialOrbitalTimeline />
            </section>
        </BackgroundPaths>
    );
}

export default Home;
