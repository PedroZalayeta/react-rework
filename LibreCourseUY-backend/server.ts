import express from "express"
import axios from "axios"
import cors from "cors"

const app = express()

app.use(cors())

const ORG = "LibreCourseUY"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const github = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        "User-Agent": "LibreCourseUY",
        ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {})
    }
})

const formatRelativeTime = (isoDate: string) => {
    const diffSeconds = Math.max(
        0,
        Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000)
    )

    if (diffSeconds < 60) return `${diffSeconds}s`

    const diffMinutes = Math.floor(diffSeconds / 60)
    if (diffMinutes < 60) return `${diffMinutes}m`

    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours}h`

    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) return `${diffDays}d`

    const diffWeeks = Math.floor(diffDays / 7)
    return `${diffWeeks}w`
}

app.get("/api/last-commit", async (_req, res) => {
    try {

        const { data: repos } = await github.get(`/orgs/${ORG}/repos`, {
            params: {
                per_page: 50,
                sort: "pushed",
                direction: "desc"
            }
        })

        let latestCommit: {
            repo: any
            commit: any
        } | null = null

        for (const repo of repos) {
            try {
                const { data: commits } = await github.get(
                    `/repos/${repo.full_name}/commits`,
                    {
                        params: { per_page: 1 }
                    }
                )

                if (commits?.length > 0) {
                    latestCommit = {
                        repo,
                        commit: commits[0]
                    }
                    break
                }
            } catch (err: any) {
                // GitHub returns 409 for empty repositories without commits.
                if (err.response?.status === 409) {
                    continue
                }

                throw err
            }
        }

        if (!latestCommit) {
            return res.status(404).json({ message: "no commits found" })
        }

        const commitData = latestCommit.commit
        const repoSlug = (latestCommit.repo.full_name || "unknown").toLowerCase()
        const authorName =
            commitData?.author?.login?.trim() ||
            commitData?.commit?.author?.name?.trim() ||
            commitData?.commit?.committer?.name?.trim() ||
            "unknown"
        const commitDate =
            commitData?.commit?.author?.date ||
            commitData?.commit?.committer?.date ||
            latestCommit.repo.pushed_at ||
            new Date().toISOString()
        const message = commitData?.commit?.message || ""
        const relativeTime = formatRelativeTime(commitDate)
        const summary = `Last contribution ${relativeTime} ago\n${authorName} in ${repoSlug}`

        res.json({
            repo: repoSlug,
            author: authorName,
            message,
            date: commitDate,
            relativeTime,
            summary,
            url: commitData?.html_url,
            repoUrl: latestCommit.repo.html_url
        })

    } catch (err: any) {

        console.error(err.response?.data || err.message)

        res.status(500).json({
            error: "github api failed",
            details: err.response?.data || err.message
        })

    }
})
app.listen(6453, () => {
    console.log("API running on port 6453")
})
