import React from 'react'
import { Suspense } from 'react'
import ArticleSearchInput from "@/components/articles/article-search-input"
import { AllArticlesPageSkeleton } from './page'

const loading = () => {
  return (
    <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            All Articles
          </h1>
          {/* Search Bar */}
          <Suspense>
            <ArticleSearchInput />
          </Suspense>
          <AllArticlesPageSkeleton/>
          </div>
          </main>
    </div>
  )
}

export default loading