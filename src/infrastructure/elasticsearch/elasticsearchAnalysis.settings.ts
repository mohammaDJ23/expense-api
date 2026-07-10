import type { estypes } from '@elastic/elasticsearch';

export class ElasticsearchAnalysisSettings {
    static readonly settings: estypes.IndicesIndexSettings = {
        max_ngram_diff: 8,
        analysis: {
            tokenizer: {
                partial_tokenizer: {
                    type: 'ngram',
                    min_gram: 2,
                    max_gram: 10,
                    token_chars: ['letter', 'digit'],
                },
            },
            analyzer: {
                partial_index: {
                    type: 'custom',
                    tokenizer: 'partial_tokenizer',
                    filter: ['lowercase'],
                },
                partial_search: {
                    type: 'custom',
                    tokenizer: 'standard',
                    filter: ['lowercase'],
                },
            },
        },
    };
}
