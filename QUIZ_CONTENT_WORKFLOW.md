# Quiz Content Workflow

This document captures the repeatable workflow for creating each new Fandom Trivia quiz.

## Order of Operations

1. Pick a quiz topic that is appropriate for kids and teens.
2. Open NotebookLM and create a new notebook.
3. Search for at least 3 trivia websites with answers for the topic for each book or movie.
4. In NotebookLM, select all sources and click `Reports`.
5. Paste in the trivia-generation prompt below.
6. Replace `!!!!!!!!!!!!!!!!!!!!!!` with the movie or book name.
7. Only add the number in words if there is more than 1 movie or more than 1 book in that series.
8. After the trivia is generated, add a new section for the new trivia set.
9. Find a picture online that matches the quiz.
10. Create the SEO blog post for that same quiz using the SEO prompt in this document.

## Trivia Prompt

Use this prompt in NotebookLM after the sources are loaded:

```text
System Role: You are a specialized content creator for a fandom trivia application. Your goal is to generate high-quality, verifiable trivia questions based on specific source material.

Task:
Generate a set of trivia questions based on !!!!!!!!!!!!!!!!!!!!!!

Requirements & Format (Wayne Observation):
Question Types:
- Provide a mix of Multiple Choice Questions (MCQ) and True/False questions.
- For MCQs, provide 4 options with only one clearly correct answer.

Evidence-Based Answers:
Every answer must be accompanied by "Evidence."
Since screenshots are not available during text generation, use the Citation format: Provide the specific Book Name, Chapter, and a direct quote (context) from the text that proves the answer.

Data Schema (JSON Output):
JSON
[
  {
    "type": "multiple_choice",
    "question": "Text of the question",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_answer": "Option A",
    "evidence": {
      "type": "citation",
      "book": "Book Title",
      "chapter": "Chapter Number/Name",
      "context": "Direct quote from the text proving the answer"
    }
  },
  {
    "type": "true_false",
    "question": "Statement of the question",
    "correct_answer": "True/False",
    "evidence": {
      "type": "citation",
      "book": "Book Title",
      "chapter": "Chapter Number/Name",
      "context": "Direct quote from the text proving the answer"
    }
  }
]

Content Goal:
Focus on details that are interesting to fans but verifiable within the text. Avoid subjective questions.

Key Variables for Your Decision:
Quantity: You may want to specify how many questions (e.g., "Generate 10 questions").
Difficulty: You can add a constraint for "Easy," "Medium," or "Hard" difficulty levels.
Source Material: Ensure the LLM has access to the text or is familiar with the specific book/fandom you are referencing.
```

## SEO Blog Post Step

After the trivia and image are ready, generate a blog post for the same quiz.

Start by telling it:

```text
Do this only for [quiz name].
```

Then send this prompt:

```text
Act as an expert SEO copywriter and content marketer. Write a highly engaging, SEO-optimized blog post designed to rank for the search term [Target Keyword, e.g., Super Mario quiz]. The primary goal of this post is to attract passionate fans of [Fandom/Topic, e.g., Super Mario] from search engines and compel them to click through to take the quiz on Fandom Trivia.

Please include the following elements:
SEO Title (H1): An attention-grabbing title that front-loads the main keyword and sparks curiosity.
The Hook: A short, punchy introduction that taps into the excitement, lore, or nostalgia of the [Fandom/Topic] universe to immediately capture the reader's attention.
Structured Subheadings (H2 & H3): Use subheadings that address common fan questions or related search intent (e.g., "Which [Fandom/Topic] character are you most like?" or "How well do you actually know the lore?").
Keyword Integration: Naturally weave in secondary keywords related to trivia, personality tests, fan theories, and specific popular characters or events within the fandom.
Calls-To-Action (CTAs): Include persuasive, frictionless CTAs throughout the text (and a major one at the conclusion) directing the reader to "Test your knowledge" or "Take the ultimate [Fandom/Topic] quiz now."
Meta Description: Provide a compelling meta description (under 160 characters) optimized to drive click-through rates from the search engine results page.

Keep the tone enthusiastic, slightly challenging (to provoke them into proving their knowledge), and tailored to dedicated fans. The total word count should be around 600-800 words.

Tips for Maximum Impact
Vary Your Keywords: For a topic like The Three-Body Problem, target keywords like "Three Body Problem sci-fi trivia" or "San-Ti knowledge test." For K-pop Demon Hunters, lean into character-specific or lore-specific search terms.
Internal Linking: Once the blog is posted, make sure you hyperlink the targeted anchor text directly to the specific quiz page.
```

## Notes

- Use kid-teen-safe topics by default.
- Gather at least 3 source sites per book or movie before generating trivia.
- Keep the final trivia evidence-based and easy to verify.
- Match the image and the blog post to the exact quiz that was just created.
