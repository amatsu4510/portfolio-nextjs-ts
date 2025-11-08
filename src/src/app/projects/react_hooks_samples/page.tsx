'use client';
import React, { useState, useEffect, type FC } from 'react';
// Next.js App RouterのPageコンポーネントは通常、FC型で十分です

// 日本時間（JST）の時刻文字列を取得するヘルパー関数
// 戻り値の型を明示的に 'string' に指定
const getJSTString = (): string => {
    // toLocaleTimeStringでtimeZoneを指定することで、簡単にJSTを取得できる
    return new Date().toLocaleTimeString('ja-JP', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

// ReactHooksSamplePageコンポーネントをFC (Function Component) 型として定義
const ReactHooksSamplePage: FC = () => {
    // --- 1. useState (カウンター) ---
    // 状態変数の型を <number> と明示的に指定
    const [count, setCount] = useState<number>(0);

    // 関数に型定義 (React.MouseEvent<HTMLButtonElement> や void) を追加
    const handleCountUp = (): void => {
        // 状態更新関数形式（prevState => newState）を使う
        setCount(prevCount => prevCount + 1);
    }
    const handleCountReset = (): void => {
        setCount(0);
    }

    // --- 2. useState & useEffect (時計) ---
    // 状態変数の型を <string> と明示的に指定
    const [japanTime, setJapanTime] = useState<string>(getJSTString());

    // 副作用: 1秒ごとに時刻を更新
    useEffect(() => {
        // setIntervalの戻り値の型はNodeJS.Timeoutを使用
        const timerId: NodeJS.Timeout = setInterval(() => {
            setJapanTime(getJSTString());
        }, 1000); // 1000ミリ秒 = 1秒ごとに実行

        // クリーンアップ関数: タイマーを停止する
        return () => clearInterval(timerId);
    }, []); // 依存配列が空（[]）

    // --- 3. useContext / useReducer (気分で追加するHooksのプレースホルダー) ---
    // ここに`useContext`や`useReducer`などのHooksのロジックを追加できます。
    /*
    // 例: useReducerの定義
    // const [state, dispatch] = useReducer(reducer, initialState);

    // 例: useContextの利用
    // const authContext = useContext(AuthContext);
    */

    return (
        <div className="min-h-screen bg-white font-sans text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 py-8 sm:py-12">
            <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
                <article>
                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        {/* ページのメインタイトル */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                            React Hooks まとめ
                        </h1>

                        {/* プロジェクトの説明セクション */}
                        <div className="prose dark:prose-invert max-w-none text-left mt-8">
                            <pre className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg whitespace-pre-wrap">
                                このプロジェクトは、ReactのHooks（useState、useEffect、useContextなど）の使い方をまとめたサンプルコード集です。
                                <br />
                                各Hookの基本的な使用方法から応用例までを網羅しています。
                            </pre>

                            {/* 目次/概要を更新 */}
                            <h2 className="text-2xl mt-8 mb-4">主な内容</h2>
                            <ul>
                                <li><strong>useState:</strong> 状態管理の基本と複数の状態変数の扱い方。</li>
                                <li><strong>useEffect:</strong> 副作用の管理、依存配列の使い方、クリーンアップ関数。</li>
                            </ul>

                            {/* サンプル一覧セクション */}
                            <h2 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mt-10 border-b pb-2 border-zinc-200 dark:border-zinc-700">
                                サンプル一覧
                            </h2>

                            {/* === 1. useState サンプル (カウンター) === */}
                            <h3 className="text-2xl font-bold mt-6 text-indigo-500 dark:text-purple-400">
                                🔢 useState (カウンター)
                            </h3>

                            {/* カウンターの表示 */}
                            <p className="text-4xl font-extrabold mt-4 text-center">
                                現在のカウント: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">{count}</span>
                            </p>

                            {/* ボタンエリア */}
                            <div className="flex justify-center items-center gap-4 mt-4">
                                <button
                                    type="button"
                                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
                                    onClick={handleCountUp}
                                >
                                    カウントアップ
                                </button>
                                <button
                                    type="button"
                                    className="px-6 py-3 bg-zinc-400 text-white font-semibold rounded-lg shadow-md hover:bg-zinc-500 transition duration-150"
                                    onClick={handleCountReset}
                                >
                                    リセット
                                </button>
                            </div>

                            {/* コード表示エリア */}
                            <div className="mt-6 mb-12 bg-zinc-800 p-4 rounded-lg overflow-x-auto">
                                <pre className="text-sm text-zinc-200">
                                    <code>
{`// 1. 状態変数を定義 (TypeScript: number型を明示)
const [count, setCount] = useState<number>(0);

// 2. カウンタ更新関数 (TypeScript: 戻り値型をvoidと明示)
const handleCountUp = (): void => {
    // 状態更新関数形式を使って正確に加算
    setCount(prevCount => prevCount + 1);
}

// 3. カウンタリセット関数
const handleCountReset = (): void => {
    setCount(0);
}`}
                                    </code>
                                </pre>
                            </div>

                            <hr className="my-8 border-zinc-200 dark:border-zinc-700" />

                            {/* === 2. useState & useEffect サンプル (リアルタイム時計) === */}
                            <h3 className="text-2xl font-bold mt-6 text-indigo-500 dark:text-purple-400">
                                ⏱️ useState & useEffect (日本時間リアルタイム時計)
                            </h3>

                            <p className="text-5xl font-extrabold mt-4 text-center">
                                JST: <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400">{japanTime}</span>
                            </p>
                            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">（この時刻は1秒ごとに更新されます）</p>

                            {/* コード表示エリア */}
                            <div className="mt-6 bg-zinc-800 p-4 rounded-lg overflow-x-auto">
                                <pre className="text-sm text-zinc-200">
                                    <code>
{`// 1. 状態変数を定義 (TypeScript: string型を明示)
const [japanTime, setJapanTime] = useState<string>(getJSTString());

// 2. useEffectで副作用（タイマー）を設定
useEffect(() => {
    // 1秒ごとに時刻を更新
    const timerId: number = setInterval(() => {
        setJapanTime(getJSTString());
    }, 1000);

    // クリーンアップ関数: アンマウント時にタイマーの解除は必須
    return () => clearInterval(timerId);
}, []); // 依存配列は空（[]）`}
                                    </code>
                                </pre>
                            </div>

                            <hr className="my-8 border-zinc-200 dark:border-zinc-700" />

                            {/* === 3. useContext / useReducer (気分で追加するHooksのプレースホルダー) === */}
                            <h3 className="text-2xl font-bold mt-6 text-indigo-500 dark:text-purple-400">
                                🌐 useContext / useReducer (気分で追加)
                            </h3>
                            <div className="p-6 bg-purple-50 dark:bg-zinc-800/50 rounded-lg shadow-inner">
                                <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">
                                    このセクションには、複雑な状態管理やグローバルなデータ共有のための`useContext`や`useReducer`のデモを追加できます。
                                </p>
                                <p className="text-sm mt-2 text-zinc-500 dark:text-zinc-400">
                                    例: 認証状態、テーマ切り替え、ショッピングカートの状態など。
                                </p>
                            </div>
                            {/* 将来のHooks実装のためのコードプレースホルダー */}
                            <div className="mt-6 mb-12 bg-zinc-800 p-4 rounded-lg overflow-x-auto">
                                <pre className="text-sm text-zinc-200">
                                    <code>
{`// [将来追加するHooksのロジックをここに記述]

/*
// 例: useContextでグローバルな認証状態を取得
// (このコンポーネントの外側でAuthContextを定義する必要があります)
// const { user, logout } = useAuth();
*/

/*
// 例: useReducerで複雑なカートの状態を管理
// (外部にReducer関数を定義する必要があります)
// const [cart, dispatch] = useReducer(cartReducer, initialCart);
*/`}
                                    </code>
                                </pre>
                            </div>

                        </div>
                    </div>
                </div>
                </article>
            </main>
        </div>
    );
}

export default ReactHooksSamplePage;
