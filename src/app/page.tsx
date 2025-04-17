"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const sections = [
    { id: "abstract", title: "Abstract" },
    { id: "method", title: "Method" },
    { id: "highlights", title: "Key Highlights" },
    { id: "benchmarks", title: "Overview of Results" },
    { id: "citation", title: "Citation" },
];

export default function Page() {
    const [activeSection, setActiveSection] = useState("");

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
            <div className="flex w-full max-w-7xl mx-auto">
                {/* Floating Table of Contents */}
                <aside className="w-64 hidden lg:block fixed top-20 left-8 shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-lg font-bold text-zinc-700">Table of Contents</h3>
                    <ul className="mt-4 space-y-4">
                        {sections.map(({ id, title }) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className={`block text-zinc-600 hover:text-zinc-900 transition-all duration-200 ${activeSection === id ? "font-bold text-blue-600 bg-gray-100 p-2 rounded-md scale-105" : ""
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
                            src="./stanfordnlp_full.svg"
                            alt="Stanford NLP Logo"
                            width={120}
                            height={40}
                            className="rounded-md hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </aside>

                {/* Main Content (Centered) */}
                <main className="flex-1 flex flex-col items-center w-full max-w-6xl px-4 lg:ml-72">

                    {/* Header */}
                    <header className="text-center my-10 w-full">
                        <h2 className="text-4xl font-bold text-zinc-700 hover:text-zinc-900 transition-colors duration-300">
                            Sneaking Syntax into Transformer Language Models with Tree Regularization
                        </h2>
                        <p className="text-lg mt-4 text-zinc-700 [&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-zinc-600">
                        <a href="https://ananjan-nandi-9.github.io/" className="text-blue-600 hover:underline ml-2">
                                Ananjan Nandi<sup>1</sup>
                            </a>,
                            <a href="https://nlp.stanford.edu/~manning/" className="text-blue-600 hover:underline ml-2">
                                Christopher Manning<sup>1</sup>
                            </a>, and 
                            <a href="https://shikharmurty.com" className="text-blue-600 hover:underline ml-2">
                                Shikhar Murty<sup>1</sup>
                            </a>
                        </p>
                        <p className="text-sm text-zinc-600 mt-2">
                            <sup>1</sup>Stanford University
                        </p>
                    </header>

                    <div className="bg-white shadow-md rounded-xl p-8 mb-10 hover:shadow-lg transition-all duration-300">
                        <ul className="grid grid-cols-3 gap-6 text-lg text-zinc-700 [&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-zinc-600">
                            {[
                                { icon: "./icons/paper.svg", link: "https://arxiv.org/abs/2411.18885", label: "Paper" },
                                { icon: "./icons/code.svg", link: "https://github.com/ananjan-nandi-9/tree_regularization", label: "Code" },
                                { icon: "./icons/mail.svg", link: "mailto:ananjan@stanford.edu", label: "Mail" }
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

                    <section className="w-full max-w-4xl rounded-lg p-8 mb-8">
                        <p className="text-xl text-zinc-700 leading-relaxed">
                            <strong>TL;DR:</strong> <strong>TreeReg</strong> is an <strong>auxiliary loss term</strong> to inject syntactic inductive biases into transformer circuits <strong>without architectural modifications</strong>, resulting in improved <strong>data-efficiency</strong>, <strong>out-of-distribution language understanding</strong> and <strong>generalization</strong>.
                        </p>
                    </section>

                    {/* Sections */}
                    <section id="abstract" className="w-full max-w-4xl rounded-lg p-8 mb-8">
                        <div className="mt-6 mb-8">
                            <Image
                                src="./treereg_animation.gif"
                                alt="TreeReg Animation"
                                width={1000}
                                height={800}
                                className="rounded-md border border-gray-200 hover:border-gray-300 transition-all duration-300"
                            />
                            <p className="text-sm text-zinc-600 mt-2 text-center">
                                An overview of <strong>TreeReg</strong>
                            </p>
                        </div>
                        <h3 className="text-2xl font-semibold text-zinc-700 mb-3">Abstract</h3>
                        <p className="text-lg text-zinc-700 leading-relaxed">
                            While compositional accounts of human language understanding are based on a <strong>hierarchical tree-like process</strong>, neural models like transformers lack a direct inductive bias for such
                            tree structures. Introducing syntactic inductive biases could unlock more robust and data-efficient learning in transformer language models (LMs), but existing methods for incorporating such structure greatly restrict models,
                            either limiting their expressivity or increasing
                            inference complexity. 
                            <br></br>
                            <br></br>
                            This work instead aims
                            to softly inject syntactic inductive biases into
                            given transformer circuits, through a <strong>structured
                            regularizer</strong>.
                            We introduce <strong>TreeReg</strong>, an auxiliary loss function that converts bracketing
                            decisions from silver parses into a set of differentiable orthogonality constraints on vector
                            hidden states. <strong>TreeReg</strong> integrates seamlessly
                            with the standard LM objective, requiring no
                            architectural changes. 
                            <br></br>
                            <br></br>
                            LMs pre-trained with <strong>TreeReg</strong> on natural language corpora such
                            as WikiText-103 achieve up to <strong>10%</strong> lower perplexities on out-of-distribution data and up to <strong>9.5</strong> point improvements in syntactic generalization, requiring <strong>less than half the training data</strong> to
                            outperform standard LMs. <strong>TreeReg</strong> still provides gains for pre-trained LLMs: Continued
                            pre-training of Sheared Llama with <strong>TreeReg</strong> results in improved syntactic generalization,
                            and fine-tuning on MultiNLI with <strong>TreeReg</strong> mitigates degradation of performance on adversarial NLI benchmarks by <strong>41.2</strong> points. 
                        </p>
                    </section>
                    
                    <section id="method" className="w-full max-w-4xl rounded-lg p-8 mb-8">
                        <h3 className="text-2xl font-semibold text-zinc-700 mb-6">Method</h3>
                        <div className="mt-6 mb-8">
                            <Image
                                src="./treereg_fig_1.png"
                                alt="TreeReg Method Diagram" 
                                width={1000}
                                height={800}
                                className="rounded-md border border-gray-200 hover:border-gray-300 transition-all duration-300"
                            />
                            <p className="text-sm text-zinc-600 mt-2 text-center">
                                Computation of the <strong>TreeReg</strong> loss (L<sub>TR</sub>) for "he is very happy now". This loss term softly biases hidden states from a given transformer circuit to respect syntactic structure through orthogonality constraints.
                            </p>
                        </div>
                    </section>

                    <section id="highlights" className="w-full max-w-4xl rounded-lg p-8 mb-8">
                        <h3 className="text-2xl font-semibold text-zinc-700 mb-6">Key Highlights</h3>
                        <ul className="space-y-4 text-lg text-zinc-700">
                            {[
                                { emoji: "🛠️", text: "<strong>Plug-and-Play Regularizer:</strong> Just add <strong>TreeReg</strong> to your LM loss — no changes to model architecture or inference." },
                                { emoji: "📈", text: "<strong>Data-Efficient Language Learning:</strong> Outperforms baselines on syntactic generalization with less than half the training data." },
                                { emoji: "🚀", text: "<strong>Robust OOD Understanding:</strong> Boost out-of-distribution language understanding and syntactic generalization across model scales." },
                                { emoji: "🧩", text: "<strong>Broad Applicability:</strong> Effective during pre-training from scratch, as well as continued pre-training and fine-tuning of pre-trained LLMs." },
                                { emoji: "🔄", text: "<strong>Flexible and Efficient:</strong> Apply <strong>TreeReg</strong> on a parsed dataset while pre-training on a separate unparsed corpus, and retain all benefits." }
                            ].map((item, index) => (
                                <li key={index} className="flex items-start hover:bg-gray-50 p-2 rounded-md transition-all duration-200">
                                    <span className="mr-2">{item.emoji}</span>
                                    <span dangerouslySetInnerHTML={{ __html: item.text }} />
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Example Rollouts */}
                    <section id="benchmarks" className="w-full max-w-4xl rounded-lg p-8 mt-12 mb-8">
                        <h3 className="text-2xl font-semibold text-zinc-700 mb-4">Overview of Results</h3>
                        <p className="text-lg text-zinc-700 mb-4 [&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-zinc-600">
                            Detailed experimental setups and results are available in our <a href="https://arxiv.org/abs/2411.18885" className="text-zinc-800 hover:underline [&_a]:underline">paper</a>.
                        </p>

                        <ul className="space-y-8 text-lg text-zinc-700">
                            <li>
                                <p className="mb-4">
                                    <strong>Grokking:</strong>
                                    <br></br>
                                     LMs pre-trained with <strong>TreeReg</strong> grok faster and achieve higher performance than non-syntactic baselines on diagnostic sentence transformation tasks.
                                </p>
                                <div className="overflow-x-auto mb-8">
                                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="px-3 py-1.5 text-center text-sm font-semibold text-gray-700 border-b border-r border-gray-200">Model</th>
                                                <th className="px-3 py-1.5 text-center text-sm font-semibold text-gray-700 border-b border-r border-gray-200 min-w-[180px]">Accuracy (↑)</th>
                                                <th className="px-3 py-1.5 text-center text-sm font-semibold text-gray-700 border-b border-gray-200 min-w-[180px]">Iteration of Convergence (↓)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-gray-50">
                                                <td className="px-3 py-1.5 text-sm text-gray-700 border-b border-r border-gray-200 text-center" colSpan={3}>
                                                    <i>Tense Inflection</i>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 transition-colors duration-150">
                                                <td className="px-3 py-1.5 text-sm text-gray-700 border-b border-r border-gray-200 text-center">Base LM</td>
                                                <td className="px-3 py-1.5 text-sm text-gray-700 border-b border-r border-gray-200 text-center min-w-[180px]">47.2 ± 16.7</td>
                                                <td className="px-3 py-1.5 text-sm text-gray-700 border-b border-gray-200 text-center min-w-[180px]">427k ± 41k</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 transition-colors duration-150">
                                                <td className="px-3 py-1.5 text-sm font-medium text-gray-900 border-b border-r border-gray-200 text-center">TreeReg LM</td>
                                                <td className="px-3 py-1.5 text-sm font-medium text-gray-900 border-b border-r border-gray-200 text-center min-w-[180px]"><strong>90.4 ± 6.3</strong></td>
                                                <td className="px-3 py-1.5 text-sm font-medium text-gray-900 border-b border-gray-200 text-center min-w-[180px]"><strong>391k ± 35k</strong></td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="px-3 py-1.5 text-sm font-medium text-gray-900 border-b border-r border-gray-200 text-center" colSpan={3}>
                                                    <i>Question Formation</i>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 transition-colors duration-150">
                                                <td className="px-3 py-1.5 text-sm text-gray-700 border-b border-r border-gray-200 text-center">Base LM</td>
                                                <td className="px-3 py-1.5 text-sm text-gray-700 border-b border-r border-gray-200 text-center min-w-[180px]">42.1 ± 15.4</td>
                                                <td className="px-3 py-1.5 text-sm text-gray-700 border-b border-gray-200 text-center min-w-[180px]">460k ± 7k</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 transition-colors duration-150">
                                                <td className="px-3 py-1.5 text-sm font-medium text-gray-900 border-b border-r border-gray-200 text-center">TreeReg LM</td>
                                                <td className="px-3 py-1.5 text-sm font-medium text-gray-900 border-b border-r border-gray-200 text-center min-w-[180px]"><strong>99.6 ± 0.7</strong></td>
                                                <td className="px-3 py-1.5 text-sm font-medium text-gray-900 border-b border-gray-200 text-center min-w-[180px]"><strong>43k ± 26k</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                            <li>
                                <p className="mb-4">
                                    <strong>Pre-training on a parsed corpus:</strong>
                                    <br></br>
                                     Pre-training 16-layer language models from scratch with <strong>TreeReg</strong> on the <strong>BLLIP-LG</strong> corpus results in out-of-distribution language understanding improvements on the Penn Treebank, as well as syntactic generalization gains on BLiMP and SyntaxGym.
                                </p>
                                <div className="flex justify-center">
                                    <Image
                                        src="./prs.png"
                                        alt="Pre-training on a parsed corpus"
                                        width={600}
                                        height={500}
                                        className="rounded-md border border-gray-200 hover:border-gray-300 transition-all duration-300"
                                    />
                                </div>
                            </li>
                            <li>
                                <p className="mb-4">
                                    <strong>Pre-training sample-efficiency:</strong>
                                    <br></br>
                                     Model with <strong>TreeReg</strong> surpasses the baseline's syntactic generalization when trained on only half of its training data. 
                                </p>
                                <div className="flex justify-center">
                                    <Image
                                        src="./sg_se-1.png"
                                        alt="Pre-training sample-efficiency"
                                        width={300}
                                        height={300}
                                        className="rounded-md border border-gray-200 hover:border-gray-300 transition-all duration-300"
                                    />
                                </div>
                            </li>
                            <li>
                                <p className="mb-4">
                                    <strong>Pre-training on a mixture of parsed and unparsed corpora: </strong>
                                    <br></br>
                                     Pre-training <strong>GPT-2-small</strong> on the unparsed <strong>WikiText-103</strong> corpus while performing <strong>TreeReg</strong> on the parsed <strong>BLLIP-LG</strong> corpus results in improved syntactic generalization and out-of-distribution language understanding. 
                                </p>
                                <div className="flex justify-center">
                                    <Image
                                        src="./prpup.png"
                                        alt="Pre-training on a mixture of parsed and unparsed corpora"
                                        width={600}
                                        height={500}
                                        className="rounded-md border border-gray-200 hover:border-gray-300 transition-all duration-300"
                                    />
                                </div>
                            </li>
                            <li>
                                <p className="mb-4">
                                    <strong>Continued pre-training:</strong>
                                    <br></br>
                                     Using <strong>TreeReg</strong> during continued pre-training of <strong>Sheared Llama-1.3B</strong> (Base LM) on the <strong>BLLIP-LG</strong> corpus results in improved syntactic generalization and out-of-distribution language understanding compared to a non-syntactic baseline (CPT LM).
                                </p>
                                <div className="flex justify-center">
                                    <Image
                                        src="./cpt.png"
                                        alt="Continued pre-training"
                                        width={600}
                                        height={500}
                                        className="rounded-md border border-gray-200 hover:border-gray-300 transition-all duration-300"
                                    />
                                </div>
                            </li>
                            <li>
                                <p className="mb-4">
                                    <strong>Fine-tuning:</strong>
                                    <br></br>
                                     When used during fine-tuning of <strong>Sheared-Llama-1.3B</strong> on Natural Language Inference datasets, <strong>TreeReg</strong> mitigates degradation of performance on adversarial benchmarks (<strong>MoNLI</strong>, <strong>MED</strong>) compared to a non-syntactic baseline (FT LM).
                                </p>
                                <div className="flex justify-center">
                                    <Image
                                        src="./nli.png"
                                        alt="Fine-tuning"
                                        width={350}
                                        height={250}
                                        className="rounded-md border border-gray-200 hover:border-gray-300 transition-all duration-300"
                                    />
                                </div>
                            </li>
                        </ul>
                    </section>

                    {/* Citation */}
                    <section id="citation" className="w-full max-w-4xl rounded-lg p-8 mb-8">
                        <h3 className="text-2xl font-semibold text-zinc-700 mb-4">Citation</h3>
                        <p className="text-lg text-zinc-700 leading-relaxed">
                            If you find our work useful, please cite our paper:
                        </p>

                        <div className="bg-gray-100 p-6 rounded-md shadow-sm">
                            <pre className="text-sm font-mono text-zinc-700 whitespace-pre-wrap">
                                {`@misc{nandi2025sneakingsyntaxtransformerlanguage,
      title={Sneaking Syntax into Transformer Language Models with Tree Regularization}, 
      author={Ananjan Nandi and Christopher D. Manning and Shikhar Murty},
      year={2025},
      eprint={2411.18885},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2411.18885}, 
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
                                className="text-blue-600 hover:underline hover:text-blue-700 transition-colors duration-300"
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
