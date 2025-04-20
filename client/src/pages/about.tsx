export default function About() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 text-center">
      <h2 className="text-4xl font-bold text-blue-600 mb-6">About CapSum</h2>

      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        CapSum is your creative companion powered by AI. Whether you're looking
        to generate engaging captions from images or get concise summaries from
        YouTube videos, CapSum is built to boost your content creation workflow.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Our mission is to simplify and enhance the way users interact with
        visual and video content using the power of AI. With just a few clicks,
        transform your ideas into polished, share-worthy outputs.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-12">
        CapSum is perfect for creators, marketers, and anyone looking to save
        time while still producing high-quality captions and summaries. Powered
        by modern AI models and built with love using the MERN stack.
      </p>

      {/* Reach Us Section */}
      <h3 className="text-3xl font-semibold text-blue-600 mb-4">Reach Us</h3>
      <div className="flex justify-center gap-6 text-gray-700 text-lg flex-wrap">
        <a
          href="https://www.linkedin.com/in/jashwanth-sai-tandamalla-0725js"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/Jashwanth0725"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition"
        >
          GitHub
        </a>
        <a
          href="https://portfolio-new-jashwanth0725s-projects.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition"
        >
          Portfolio
        </a>
        <a
          href="mailto:jashwanthsai07251@gmail.com"
          className="hover:text-blue-600 transition"
        >
          jashwanthsai07251@gmail.com
        </a>
      </div>
    </section>
  );
}
