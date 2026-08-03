const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>

      <div className="relative z-10 animate-slide-up">
        <div className="glass p-8 md:p-10 rounded-3xl shadow-sm border border-white/50 max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-secondary tracking-tight mb-8 border-b border-gray-200/50 pb-6">
            Terms and Conditions
          </h2>
          
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/60 shadow-inner h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="prose prose-sm md:prose-base text-gray-600 max-w-none space-y-6">
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius nihil earum ipsam aperiam, fugiat pariatur minima sequi veritatis natus consequuntur quas in saepe expedita non fuga eligendi cum dolor corrupti. Numquam consectetur, nobis enim non animi expedita, impedit architecto quo voluptatem voluptatum quasi nemo tempore suscipit odio cumque recusandae sapiente magni blanditiis placeat nostrum aliquam eligendi necessitatibus. Odit cum doloremque recusandae ipsa eveniet!
              </p>
              <p className="leading-relaxed">
                Molestiae illum et repudiandae nobis iusto nisi explicabo atque doloremque, eaque architecto quae iste officia laudantium ullam sed sit omnis suscipit a ipsum, dolores optio corporis. Libero quis porro velit beatae sed ratione a esse quam commodi fugit, perspiciatis aperiam iure repellendus placeat iste voluptate, at sequi expedita quos reprehenderit adipisci natus cumque? Harum, nesciunt labore! Rem laudantium obcaecati aliquam veritatis eligendi, magni autem facere est similique exercitationem adipisci minus rerum ut pariatur molestias?
              </p>
              <h3 className="text-xl font-bold text-secondary mt-8 mb-4">1. Acceptance of Terms</h3>
              <p className="leading-relaxed">
                Nobis tenetur voluptatum facere! Laborum ut, omnis voluptatum cumque perspiciatis assumenda corporis ullam iusto rem molestias. Nostrum eaque sed rem quaerat reprehenderit suscipit et quasi, ipsam porro sit dicta provident, autem explicabo laboriosam, dolores exercitationem ad officiis necessitatibus aut est architecto. Iste, facere est. Expedita, cumque nostrum? Quasi quia soluta ullam nulla tempore!
              </p>
              <h3 className="text-xl font-bold text-secondary mt-8 mb-4">2. User Responsibilities</h3>
              <p className="leading-relaxed">
                Et, fugiat quae, harum asperiores provident ab maiores voluptatibus velit sit facere explicabo quasi dolor perspiciatis nemo magnam saepe cumque molestiae debitis, eos nisi voluptatem. Odit, assumenda itaque asperiores quod blanditiis cumque provident consequatur placeat architecto ea sed beatae expedita dignissimos eveniet id maiores, ipsum fugiat rem quis vitae. Non voluptates, possimus sunt ab quos ratione expedita, dolor vero quas totam dolorem facilis dolorum impedit ducimus asperiores ad blanditiis itaque illo magnam, magni at laboriosam tempora explicabo optio!
              </p>
              <p className="leading-relaxed">
                Eveniet et, magnam sint in sapiente esse nobis pariatur sit ipsum quos recusandae commodi tempore atque, alias consequatur velit incidunt culpa veritatis aliquid omnis? Magnam accusamus, suscipit eius corrupti odio voluptatem accusantium. Illum mollitia eveniet nisi blanditiis! Illum eum fugiat provident vero suscipit unde ipsum numquam labore commodi explicabo ipsa optio delectus assumenda hic animi ex molestias laboriosam earum eius deserunt, voluptate ad!
              </p>
              <p className="leading-relaxed">
                Magnam rerum earum nostrum, sapiente a fugiat. Praesentium obcaecati quia qui necessitatibus itaque dignissimos, dolorum quae unde ad dicta ullam velit dolorem officiis ducimus temporibus, repellendus non mollitia assumenda consectetur, perferendis corrupti et optio? Facilis corporis accusantium autem veritatis illo, eligendi odit animi, recusandae iusto aliquid similique quam ratione perferendis quis consectetur pariatur tenetur dolor sequi laborum doloremque? Dolor quae perspiciatis odio, ab corrupti aperiam iste repellat assumenda ducimus?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
