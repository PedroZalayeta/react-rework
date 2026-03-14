import { useEffect, useMemo, useState } from "react";
import BlurText from "../components/BlutText";
import Beams from "../components/Beams";

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
        <>
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
                        className="text-6xl font-extrabold text-white"
                    />
                    <BlurText
                        text="Open Source projects made in Uruguay"
                        delay={25}
                        animateBy="letters"
                        direction="bottom"
                        className="text-3xl font-bold text-gray-500"
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

                        <div className="hero-commit-meta">
                            <a
                                href={`https://github.com/${commit.author}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="commit-link"
                            >
                                {commit.author}
                            </a>
                            {" in "}
                            <a
                                href={commit.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="commit-link"
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

            <section className="why-english-section">
                <div className="why-english-card">
                    <h6 className="small-title">¿Por qué todo está en inglés?</h6>
                    <p className="text-normal">
                        Puede parecer raro ver todo en inglés en un sitio para uruguayos. Te explicamos porqué:
                    </p>

                    <li>
                        <ol>El inglés es el idioma de la programación: La mayoría de la documentación, tutoriales y recursos están en inglés. Dominarlo te abre puertas a nivel mundial.</ol>
                        <ol>Buscar soluciones en inglés: Cuando tengas un error, el 90% de las respuestas están en Stack Overflow / Reddit y documentación en inglés.</ol>
                        <ol>Preparación profesional: Las empresas tech contratan personas que pueden trabajar en inglés. Es una habilidad fundamental.</ol>
                        <ol>Comunidad global: Al contribuir a proyectos open source, vas a interactuar con personas de todo el mundo.</ol>
                    </li>

                    <p className="text-grey">
                        💡 Consejo: No necesitas ser fluido. Con poder leer y escribir lo básico ya es suficiente para empezar.
                    </p>
                </div>
            </section>

            <section className="features">
                <div className="feature-card">
                    <div className="feature-icon">🎯</div>
                    <h3 className="feature-title">Learn by Doing</h3>
                    <p className="feature-text">
                        Contribute to real projects and learn industry-standard tools like Git, GitHub, and modern frameworks.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">🤝</div>
                    <h3 className="feature-title">Community Driven</h3>
                    <p className="feature-text">
                        Built by students, for students. Join a community of learners and help others just like you.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">🚀</div>
                    <h3 className="feature-title">Build Your Portfolio</h3>
                    <p className="feature-text">
                        Get real-world experience and add meaningful projects to your developer portfolio.
                    </p>
                </div>
            </section>
        </>
    );
}

export default Home;
