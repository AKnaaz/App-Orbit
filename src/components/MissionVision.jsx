import { Target, Eye } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="w-full px-6 py-12 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-16">
        Our Mission & Vision
      </h2>

      {/* Mission */}
      <div className="rounded-2xl shadow-xl p-8 flex flex-col items-center text-center mb-8">
        <Target className="w-12 h-12 mb-4" />
        <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
        <p className="text-base leading-relaxed">
          Our mission is to empower innovators to share their unique and 
          groundbreaking ideas with the world. We strive to create a 
          platform where creators can connect with the right audience 
          and gain the recognition they deserve. By bridging the gap 
          between developers and users, we aim to accelerate the growth 
          of innovative solutions. Ultimately, we want to make technology 
          more accessible, meaningful, and impactful for everyone.
        </p>
      </div>

      {/* Vision */}
      <div className="rounded-2xl shadow-xl p-8 flex flex-col items-center text-center mb-8">
        <Eye className="w-12 h-12 mb-4" />
        <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
        <p className="text-base leading-relaxed">
          Our vision is to become the leading global platform for discovering 
          and celebrating trending products and innovations. We aspire to 
          inspire creativity among individuals and teams by giving them 
          the opportunity to showcase their work. We want to build a 
          strong community where users can explore, support, and promote 
          innovative solutions. In the long run, our goal is to foster a 
          culture of collaboration that drives positive change and 
          shapes the future of technology worldwide.
        </p>
      </div>
    </section>
  );
};

export default MissionVision;
