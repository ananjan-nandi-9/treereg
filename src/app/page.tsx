"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Select from "react-select";

const sections = [
    { id: "abstract", title: "Abstract" },
    { id: "examples", title: "Example Rollouts" },
    { id: "benchmarks", title: "Benchmarks & Results" },
    { id: "citation", title: "Citation" },
];

export default function Page() {
    const videoSources = Array.from({ length: 29 }, (_, i) => `/videos/output_${i}.mp4`);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [videoText, setVideoText] = useState("");
    const [videoTitles, setVideoTitles] = useState(Array(29).fill(""));
    const [activeSection, setActiveSection] = useState("");

    const videoOptions = videoTitles.map((title, index) => ({
        value: index,
        label: title,
    }));




    useEffect(() => {
        const fetchVideoText = async () => {
            try {
                const response = await fetch(`/video_metadata/output_${currentIndex}.txt`);
                if (response.ok) {
                    const text = await response.text();
                    setVideoText(text);
                } else {
                    setVideoText("No description available.");
                }
            } catch (error) {
                setVideoText("Error loading description.");
            }
        };

        fetchVideoText();
    }, [currentIndex]);

    useEffect(() => {
        const fetchVideoTitles = async () => {
            const titles = await Promise.all(
                videoSources.map(async (_, index) => {
                    try {
                        const response = await fetch(`/video_metadata/description_${index}.txt`);
                        if (response.ok) {
                            return await response.text();
                        }
                    } catch (error) { }
                    return `Video ${index + 1}`;
                })
            );
            setVideoTitles(titles);
        };
        fetchVideoTitles();
    }, []);

    // Scroll tracking for the active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-[#FFFCF8] flex flex-col items-center p-6 font-serif text-zinc-700">
            {/* Responsive Layout */}
            <div className="flex w-full max-w-6xl mx-auto">
                {/* Floating Table of Contents */}
                <aside className="w-64 hidden lg:block fixed top-20 left-8 shadow-md rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-zinc-700">Table of Contents</h3>
                    <ul className="mt-4 space-y-4">
                        {sections.map(({ id, title }) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className={`block text-zinc-600 hover:text-zinc-900 transition ${activeSection === id ? "font-bold text-blue-600 bg-gray-100 p-2 rounded-md" : ""
                                        }`}
                                >
                                    {title}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Stanford NLP Logo */}
                    <div className="mt-6 flex justify-center">
                        <Image
                            src="/stanfordnlp_full.svg"  // Ensure this is the correct path
                            alt="Stanford NLP Logo"
                            width={120}
                            height={40}
                            className="rounded-md"
                        />
                    </div>
                </aside>




                {/* Main Content (Centered) */}
                <main className="flex-1 flex flex-col items-center w-full max-w-6xl px-4 lg:ml-72">

                    {/* Header */}
                    <header className="text-center my-10 w-full">
                        <h2 className="text-3xl font-bold text-zinc-700">
                            NNetNav: Unsupervised Learning of Browser Agents Through Environment Interaction in the Wild
                        </h2>
                        <p className="text-lg mt-4 text-zinc-700 [&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-zinc-600">
                            <a href="https://cs.stanford.edu/~shikhar/" className="text-blue-600 hover:underline ml-2">
                                Shikhar Murty<sup>1</sup>
                            </a>,
                            <a href="https://www.zhuhao.me" className="text-blue-600 hover:underline ml-2">
                                Hao Zhu<sup>1</sup>
                            </a>,
                            <a href="https://rizar.github.io" className="text-blue-600 hover:underline ml-2">
                                Dzmitry Bahdanau<sup>2</sup>
                            </a>, and
                            <a href="https://nlp.stanford.edu/~manning/" className="text-blue-600 hover:underline ml-2">
                                Christopher Manning<sup>1</sup>
                            </a>
                        </p>
                        <p className="text-sm text-zinc-600 mt-2">
                            <sup>1</sup>Stanford University, <sup>2</sup>ServiceNow Research
                        </p>
                    </header>


                    <div className="bg-white shadow-md rounded-xl p-8 mb-10">
                        <ul className="grid grid-cols-2 sm:grid-cols-6 gap-6 text-lg text-zinc-700 [&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-zinc-600">
                            {[
                                { icon: "/icons/paper.svg", link: "https://arxiv.org/abs/2410.02907", label: "Paper" },
                                { icon: "/icons/code.svg", link: "https://github.com/MurtyShikhar/NNetnav", label: "Code" },
                                { icon: "/icons/nnetnav-live.svg", link: "https://huggingface.co/stanfordnlp/llama8b-nnetnav-wa", label: "Model (WA)" },
                                { icon: "/icons/nnetnav-live.svg", link: "https://huggingface.co/stanfordnlp/llama8b-nnetnav-live", label: "Model (Live)" },
                                { icon: "/icons/data.svg", link: "https://huggingface.co/datasets/stanfordnlp/nnetnav-wa", label: "Data (WA)" },
                                { icon: "/icons/data.svg", link: "https://huggingface.co/datasets/stanfordnlp/nnetnav-live", label: "Data (Live)" }
                            ].map(({ icon, link, label }, index) => (
                                <li key={index} className="flex flex-col items-center">
                                    <Image src={icon} alt={`${label} Icon`} width={50} height={50} />
                                    <Link href={link} className="text-blue-600 hover:underline mt-2">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sections */}
                    <section id="abstract" className="w-full max-w-3xl rounded-lg p-8 mb-8">
                        <h3 className="text-2xl font-semibold text-zinc-700 mb-3">Abstract</h3>
                        <p className="text-lg text-zinc-700 leading-relaxed">
                            We introduce <strong>NNetNav</strong>, a method for unsupervised interaction with websites that
                            generates synthetic demonstrations for training browser agents. Given any website, NNetNav produces these
                            demonstrations by retroactively labeling action sequences from an exploration policy. Most work on training
                            browser agents has relied on expensive human supervision, and the limited prior work on such interaction-based
                            techniques has failed to provide effective search through the exponentially large space of exploration.
                            In contrast, NNetNav exploits the hierarchical structure of language instructions to make this search more
                            tractable: Complex instructions are typically decomposable into simpler sub-tasks, allowing NNetNav to automatically
                            prune interaction episodes when an intermediate trajectory cannot be annotated with a meaningful sub-task.
                            <br /><br />
                            LLama-3.1-8b finetuned on 10k NNetNav self-generated demonstrations obtains over <strong>16%</strong> success rate
                            on WebArena, and <strong>35%</strong> on WebVoyager, an improvement of <strong>15pts</strong> and <strong>31pts</strong> respectively over zero-shot LLama-3.1-8b, outperforming zero-shot GPT-4 and reaching the state-of-the-art among
                            unsupervised methods, for both benchmarks.
                        </p>
                        <div className="mt-6">
                            <Image
                                src="/nnetnav_overview.svg"
                                alt="NNetNav Overview Figure"
                                width={1000}
                                height={800}
                                className="rounded-md"
                            />
                            <p className="text-sm text-zinc-600 mt-2 text-center">
                                Figure 1: Given web URLs (1), NNetNav (2) uses a structured exploration strategy to interact with websites (3) and autonomously discover diverse (instruction, trajectory) demonstrations, as summarized in (4). To effectively prune exploration, the trajectory-so-far is periodically evaluated by a relabeling module and further exploration continues only if it can be assigned a meaningful language instruction. All components in NNetNav are implemented with the same zero-shot base LLM
                            </p>
                        </div>
                    </section>


                    <section id="examples" className="w-full max-w-3xl rounded-lg p-8 mb-8">
                        <h3 className="text-2xl font-semibold text-zinc-700 mb-6">Example Traces from our Models</h3>
                        <p className="text-lg text-zinc-700 mb-4 [&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-zinc-600">
                            Below are some example traces from our model on <a href="https://webarena.dev/" className="text-blue-600 hover:underline">WebArena</a> and <a href="https://github.com/MinorJerry/WebVoyager" className="text-blue-600 hover:underline">WebVoyager</a>.
                            The model is able to follow complex instructions such as "Reply to the first comment on the post about woodworking in the sub-reddit r/woodworking" and "Find driving directions from Stanford to San Francisco".
                            In some of these examples the model shows the ability to back-track. Pushing further on such emergent back-tracking is an active area of research for us.
                        </p>
                        <div className="relative w-full flex flex-col items-center">

                            <p className="text-zinc-700 mb-2 text-lg font-medium">
                                Use the dropdown to choose an example to view
                            </p>
                            <select
                                className="p-3 border border-gray-300 rounded-md bg-white text-zinc-700 text-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none hover:bg-gray-50 transition"
                                value={currentIndex}
                                onChange={(e) => setCurrentIndex(Number(e.target.value))}
                            >
                                {videoTitles.map((title, index) => (
                                    <option key={index} value={index}>
                                        {title}
                                    </option>
                                ))}
                            </select>


                            <div className="bg-white shadow-md rounded-xl overflow-hidden w-full max-w-2xl mt-4">
                                <video className="w-full" key={videoSources[currentIndex]} controls>
                                    <source src={`/videos/output_${currentIndex}.webm`} type="video/webm" />
                                    <source src={videoSources[currentIndex]} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>

                        <p className="mt-4 text-lg text-zinc-700 text-center">
                            {videoText}
                        </p>
                    </section>


                    {/* Example Rollouts */}
                    <section id="benchmarks" className="w-full max-w-3xl rounded-lg p-8 mt-12 mb-8">
                        <h3 className="text-2xl font-semibold text-zinc-700 mb-4">Benchmarks & Results</h3>
                        <p className="text-lg text-zinc-700 leading-relaxed mb-6">
                            We evaluate <strong>NNetNav</strong> on two standard web navigation benchmarks:
                            <strong>WebArena</strong> and <strong>WebVoyager</strong>. Our method achieves significant improvements over existing baselines, including large-scale language models like GPT-4 and zero-shot LLaMA-3.1-8b.
                        </p>

                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 rounded-lg">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-3 px-4 border-b text-left font-bold text-zinc-700">Method</th>
                                        <th className="py-3 px-4 border-b text-center font-bold text-zinc-700">WebArena</th>
                                        <th className="py-3 px-4 border-b text-center font-bold text-zinc-700">WebVoyager</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white">
                                        <td className="py-3 px-4 border-b text-left text-zinc-700">GPT-4 (Zero-shot)</td>
                                        <td className="py-3 px-4 border-b text-center text-zinc-700">XX%</td>
                                        <td className="py-3 px-4 border-b text-center text-zinc-700">XX%</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="py-3 px-4 border-b text-left text-zinc-700">LLaMA-3.1-8B (Zero-shot)</td>
                                        <td className="py-3 px-4 border-b text-center text-zinc-700">XX%</td>
                                        <td className="py-3 px-4 border-b text-center text-zinc-700">XX%</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="py-3 px-4 border-b text-left font-bold text-zinc-700">NNetNav (Ours)</td>
                                        <td className="py-3 px-4 border-b text-center font-bold text-zinc-700">XX%</td>
                                        <td className="py-3 px-4 border-b text-center font-bold text-zinc-700">XX%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>




                    {/* Citation */}
                    <section id="citation" className="w-full max-w-3xl rounded-lg p-8 mb-8">
                        <h3 className="text-2xl font-semibold text-zinc-700 mb-4">Citation</h3>
                        <p className="text-lg text-zinc-700 leading-relaxed">
                            If you find our work useful, please cite our paper:
                        </p>

                        <div className="bg-gray-100 p-6 rounded-md shadow-sm">
                            <pre className="text-sm font-mono text-zinc-700 whitespace-pre-wrap">
                                {`@inproceedings{Murty2025NNetNav,
  author= {Shikhar Murty and Hao Zhu and Dzmitry Bahdanau and Christopher Manning},
  title={NNetNav: Unsupervised Learning of Browser Agents Through Environment Interaction in the Wild},
  journal={arXiv preprint arXiv:2410.02907},
  year={2025}
}`}
                            </pre>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="mt-12 text-center text-zinc-600 text-sm w-full">
                        <p className="mt-2 [&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-zinc-600">
                            Built with{" "}
                            <a
                                href="https://nextjs.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Next.js
                            </a>
                        </p>
                    </footer>
                </main>
            </div>
        </div>

    )
}
