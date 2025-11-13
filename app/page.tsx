"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CompassChart } from "@/components/compass-chart"
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react"

const questions = {
  strategic: [
    "The validity of a political principle is determined by its practical success in achieving positive societal outcomes.",
    "In politics, it is often necessary to prioritize solving immediate crises over adhering to long-term, abstract ideals.",
    "If a consistently applied ethical theory leads to a conclusion that feels intuitively wrong or harmful, it is more likely that the theory is flawed than our intuition.",
    "Achieving tangible, incremental victories for liberty through strategic alliances with powerful, non-libertarian figures is a more valuable use of political capital than maintaining ideological purity.",
    "A deep commitment to abstract ideology can sometimes prevent a person from seeing and responding effectively to immediate, practical problems facing society.",
    "Political strategies must be constantly updated to reflect the changing social and political landscape; what was effective in the past is not necessarily the best path forward today.",
    "A movement's growth is best served by welcoming individuals who align on key, popular issues, even if those individuals do not fully subscribe to the movement's foundational principles.",
    "It is reasonable for one's personal values and feelings about what constitutes a decent society to serve as a check on the conclusions of an abstract political philosophy.",
    "At its core, libertarianism is a moral or social preference for voluntary systems, rather than a system of objective, demonstrable rights derived from natural law.",
    "A small, incremental reduction in State power achieved through political compromise is more valuable than a failed attempt at a radical, sweeping change.",
  ],
  cultural: [
    'The most significant contemporary threat to individual liberty comes from progressive ideologies focused on collective identity and social justice ("wokeism").',
    "Immigration should be viewed primarily as a threat to national culture and security, rather than an issue of individual freedom of movement and labor.",
    "The libertarian movement shares more common ground and has a more promising strategic alignment with right-wing populists than with moderate liberals.",
    'Private property rights should fully protect the ability of communities (e.g., "covenant communities") to create and enforce exclusionary rules based on cultural or behavioral standards.',
    "Libertarian messaging is most effective when it taps into populist anger against globalist elites and cultural decay.",
    "The breakdown of traditional social institutions (like the nuclear family and local churches) represents a significant crisis that liberty alone cannot solve.",
    "A focus on radical social liberalism and unconventional lifestyles within the libertarian movement alienates potential allies and should be de-emphasized.",
    "While the State is a threat, the corrosive influence of a hostile, leftist-dominated culture is an equally pressing danger to a free society.",
    "Libertarians should prioritize dismantling the federal administrative state and securing the border before addressing issues like drug legalization or foreign military intervention.",
    "The concept of a nation, while distinct from the State, is a valuable and legitimate institution for preserving a shared culture and identity.",
  ],
}

const options = [
  { value: 4, label: "Strongly Agree" },
  { value: 3, label: "Agree" },
  { value: 2, label: "Disagree" },
  { value: 1, label: "Strongly Disagree" },
]

export default function PragValuesTest() {
  const [stage, setStage] = useState<"intro" | "strategic" | "cultural" | "results">("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [strategicAnswers, setStrategicAnswers] = useState<number[]>(Array(10).fill(0))
  const [culturalAnswers, setCulturalAnswers] = useState<number[]>(Array(10).fill(0))

  const handleAnswer = (value: number) => {
    if (stage === "strategic") {
      const newAnswers = [...strategicAnswers]
      newAnswers[currentQuestion] = value
      setStrategicAnswers(newAnswers)
    } else if (stage === "cultural") {
      const newAnswers = [...culturalAnswers]
      newAnswers[currentQuestion] = value
      setCulturalAnswers(newAnswers)
    }
  }

  const handleNext = () => {
    const currentAnswers = stage === "strategic" ? strategicAnswers : culturalAnswers

    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (stage === "strategic") {
      setStage("cultural")
      setCurrentQuestion(0)
    } else if (stage === "cultural") {
      setStage("results")
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (stage === "cultural") {
      setStage("strategic")
      setCurrentQuestion(9)
    }
  }

  const handleReset = () => {
    setStage("intro")
    setCurrentQuestion(0)
    setStrategicAnswers(Array(10).fill(0))
    setCulturalAnswers(Array(10).fill(0))
  }

  const strategicScore = strategicAnswers.reduce((sum, val) => sum + val, 0)
  const culturalScore = culturalAnswers.reduce((sum, val) => sum + val, 0)

  const getResult = () => {
    if (strategicScore <= 24 && culturalScore <= 24) {
      return {
        title: "The Radical Cosmopolitan",
        description:
          "You are a principled libertarian who rejects compromise and believes in a consistent, rights-based philosophy. Your focus is on social liberalism, open borders, and anti-war positions, and you see nationalism and social conservatism as major threats to liberty. You believe the culture war is a distraction from the core principles of individual rights and free markets.",
      }
    } else if (strategicScore >= 25 && culturalScore <= 24) {
      return {
        title: "The Beltway Pragmatist",
        description:
          'You believe in compromising to achieve mainstream acceptance and political relevance. Your cultural sensibilities align more with classical liberals or moderate Democrats than with the populist right. You prioritize appearing "sensible" and professional, often through coalitions with the mainstream establishment.',
      }
    } else if (strategicScore <= 24 && culturalScore >= 25) {
      return {
        title: "The Principled Paleolibertarian",
        description:
          "You are a philosophically radical libertarian who rejects pragmatism, but your analysis leads you to conclusions that align with the cultural right. You use property rights theory to defend concepts like covenant communities and immigration restrictionism on principle. You see compromisers as unprincipled opportunists.",
      }
    } else {
      return {
        title: "The Neo-Prag",
        description:
          'You are a pragmatist whose central strategy is to win short-term "culture war" victories by aligning with the anti-establishment right. You see "what works" in terms of gaining followers and influence within this sphere. You are willing to compromise or abandon core libertarian principles in order to combat what you perceive as the greater threat of cultural leftism.',
      }
    }
  }

  if (stage === "intro") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <Card className="w-full max-w-2xl shadow-2xl border-slate-200">
          <CardHeader className="text-center space-y-4 pb-8">
            <Image src="/icon-zoom.png" alt="LiquidJoker" width={80} height={80} className="mx-auto" />
            <CardTitle className="text-4xl font-bold text-slate-900">PragValues</CardTitle>
            <CardDescription className="text-lg text-slate-600 leading-relaxed">
              Discover where you stand on the political compass of libertarian thought. This test evaluates your
              position across two key dimensions: Strategic philosophy and Cultural alignment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-slate-900 text-lg">What to expect:</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>20 questions across two axes based on "Anatomy of the Celebritarian"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Strategic Axis: Principled vs. Pragmatist approach</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Cultural Axis: Cosmopolitan vs. Paleo-Libertarian</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Estimated time: 5-7 minutes</span>
                </li>
              </ul>
            </div>
            <Button
              onClick={() => setStage("strategic")}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 shadow-lg"
            >
              Begin Test
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (stage === "results") {
    const result = getResult()
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="max-w-5xl mx-auto space-y-6 py-8">
          <Card className="shadow-2xl border-slate-200">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-10 h-10 border-4 border-white rounded-full relative">
                  <div className="absolute inset-0 border-t-4 border-white rounded-full rotate-45"></div>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900">Your Results</CardTitle>
              <CardDescription className="text-lg text-slate-600">
                Based on your responses across 20 questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <CompassChart xScore={strategicScore} yScore={culturalScore} title={result.title} />

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-600 to-slate-700 text-white rounded-xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-2">{result.title}</h2>
                  <div className="flex gap-6 text-sm font-medium">
                    <span>Strategic: {strategicScore}/40</span>
                    <span>Cultural: {culturalScore}/40</span>
                  </div>
                </div>

                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="pt-6">
                    <p className="text-slate-700 leading-relaxed text-lg">{result.description}</p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-slate-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold text-slate-600">Strategic Axis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-slate-900">{strategicScore}/40</div>
                      <p className="text-sm text-slate-600 mt-1">
                        {strategicScore <= 24 ? "Principled" : "Pragmatist"}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-semibold text-slate-600">Cultural Axis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-slate-900">{culturalScore}/40</div>
                      <p className="text-sm text-slate-600 mt-1">{culturalScore <= 24 ? "Cosmopolitan" : "Paleo"}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1 h-12 font-semibold border-slate-300 hover:bg-slate-100 bg-transparent"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentQuestions = stage === "strategic" ? questions.strategic : questions.cultural
  const currentAnswers = stage === "strategic" ? strategicAnswers : culturalAnswers
  const currentAnswer = currentAnswers[currentQuestion]
  const progress = ((currentQuestion + 1) / 10) * 100
  const totalProgress = stage === "strategic" ? progress / 2 : 50 + progress / 2

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Card className="w-full max-w-3xl shadow-2xl border-slate-200">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-slate-700 rounded-lg flex items-center justify-center shadow">
                <div className="w-6 h-6 border-2 border-white rounded-full relative">
                  <div className="absolute inset-0 border-t-2 border-white rounded-full rotate-45"></div>
                </div>
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">PragValues</CardTitle>
                <CardDescription className="text-sm">
                  {stage === "strategic" ? "Part 1: Strategic Axis" : "Part 2: Cultural Axis"}
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">{currentQuestion + 1}/10</div>
              <div className="text-sm text-slate-600">Question</div>
            </div>
          </div>

          <div className="space-y-2">
            <Progress value={totalProgress} className="h-2" />
            <p className="text-xs text-slate-600 text-center">Overall Progress: {Math.round(totalProgress)}%</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-8 border border-slate-200 shadow-sm">
            <p className="text-lg text-slate-900 leading-relaxed font-medium">{currentQuestions[currentQuestion]}</p>
          </div>

          <RadioGroup value={currentAnswer.toString()} onValueChange={(val) => handleAnswer(Number.parseInt(val))}>
            <div className="space-y-3">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 border rounded-xl p-4 transition-all cursor-pointer hover:border-blue-400 hover:bg-blue-50 ${currentAnswer === option.value
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-slate-200 bg-white"
                    }`}
                  onClick={() => handleAnswer(option.value)}
                >
                  <RadioGroupItem
                    value={option.value.toString()}
                    id={`option-${option.value}`}
                    className="border-slate-400"
                  />
                  <Label
                    htmlFor={`option-${option.value}`}
                    className="flex-1 cursor-pointer font-medium text-slate-900"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="flex gap-3 pt-4">
            {(currentQuestion > 0 || stage === "cultural") && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="px-8 h-12 font-semibold border-slate-300 hover:bg-slate-100 bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={currentAnswer === 0}
              className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-slate-700 hover:from-blue-700 hover:to-slate-800 shadow-lg disabled:opacity-50"
            >
              {currentQuestion === 9 && stage === "cultural" ? "View Results" : "Next"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
