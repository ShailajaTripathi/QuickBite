const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">About QuickBite</h1>

      {/* 1. Overview */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
        <p className="text-gray-700">
          QuickBite is a full-stack food ordering application inspired by
          real-world platforms. The goal of this project was to build a
          scalable, production-like application focusing on performance,
          state management, and clean architecture.
        </p>
      </section>

      {/* 2. Tech Stack */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Frontend: React, Redux Toolkit, React Router</li>
          <li>Backend: Node.js, Express</li>
          <li>State Management: Redux with persistence</li>
          <li>Styling: Tailwind CSS</li>
        </ul>
      </section>

      {/* 3. Features */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Restaurant and menu listing via APIs</li>
          <li>Cart management with quantity control</li>
          <li>Persistent cart using localStorage</li>
          <li>Optimized rendering using memoization</li>
        </ul>
      </section>

      {/* 4. Architecture */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Architecture Decisions</h2>
        <p className="text-gray-700">
          The application follows a component-driven architecture. Redux is
          used as a single source of truth for global state, while reusable
          custom hooks handle shared logic. Backend APIs are structured using
          controllers and routes for maintainability.
        </p>
      </section>

      {/* 5. Your Role */}
      <section>
        <h2 className="text-xl font-semibold mb-2">My Role</h2>
        <p className="text-gray-700">
          I designed and developed the application end-to-end, including
          frontend architecture, Redux state management, backend APIs, and
          performance optimizations.
        </p>
      </section>
    </div>
  );
};

export default About;
