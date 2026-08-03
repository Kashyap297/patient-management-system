const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>

      <div className="relative z-10 animate-slide-up">
        <div className="glass p-8 md:p-10 rounded-3xl shadow-sm border border-white/50 max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-secondary tracking-tight mb-8 border-b border-gray-200/50 pb-6">
            Privacy Policy
          </h2>
          
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/60 shadow-inner h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="prose prose-sm md:prose-base text-gray-600 max-w-none space-y-6">
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus laudantium quos explicabo nemo temporibus distinctio quae dolore corporis. Vitae odio cupiditate facere voluptates officiis maxime nemo quam ratione voluptatibus facilis, magni autem, molestias repellendus neque. Quis obcaecati facilis, eos vitae necessitatibus ex voluptate aliquam alias enim, fugiat, reprehenderit mollitia! Quasi, quisquam porro.
              </p>
              <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Information Collection</h3>
              <p className="leading-relaxed">
                Eveniet distinctio obcaecati sapiente inventore hic pariatur ipsum autem dolores est debitis natus animi fuga quam voluptatum sequi exercitationem, harum, laborum id. Tenetur alias tempora magnam tempore dignissimos, eligendi incidunt aliquid maxime eaque fugiat placeat eos ab, corrupti fugit a accusamus recusandae dolore assumenda odit ad provident est laudantium molestiae quis. Deserunt illum nihil quod quidem sint, vel sunt deleniti accusamus. Eum tempora illo necessitatibus voluptas porro veritatis exercitationem voluptatem delectus dolor officiis.
              </p>
              <p className="leading-relaxed">
                Magni ad sint, assumenda delectus blanditiis architecto, omnis aliquid maxime perspiciatis commodi alias. Doloremque, accusamus. Inventore pariatur eius optio! Dolores, possimus distinctio. A veritatis est necessitatibus fuga, facilis totam consectetur pariatur quaerat laboriosam quia architecto in molestiae qui saepe assumenda ducimus! Laboriosam laborum explicabo qui a, earum porro corporis cum exercitationem non ut sapiente ducimus, culpa architecto commodi.
              </p>
              <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Data Protection</h3>
              <p className="leading-relaxed">
                Explicabo, iste sequi ad placeat, perferendis asperiores et ducimus sed blanditiis modi quas soluta iusto vero perspiciatis vitae assumenda laudantium quia corporis eligendi, fugit ut illo hic tempore. Accusamus doloribus ducimus ex architecto quos esse nam rem vel illo distinctio eius fugit veritatis tempore asperiores quod porro, aut hic numquam voluptates iure incidunt amet maxime? Fuga minima aperiam, error laborum eum dolorem cupiditate odit.
              </p>
              <p className="leading-relaxed">
                Maxime atque repellat nihil eligendi eos laborum voluptas vero vitae enim libero cumque consequatur quia, ad velit excepturi rerum tempora, amet tenetur provident quos deserunt consequuntur id labore inventore! Voluptas voluptatem consectetur delectus temporibus non ut cupiditate ab maiores aperiam aliquid, sed culpa mollitia accusantium fugiat in iure, similique officia facere earum, exercitationem voluptatum sint repudiandae veritatis quod.
              </p>
              <p className="leading-relaxed">
                Inventore maxime eum quidem quis ad ea libero eius nesciunt doloribus laboriosam assumenda odio veritatis earum iusto, esse neque magnam temporibus? Mollitia ipsa autem, eligendi officia tempore error ea dolore inventore voluptate, corporis, dicta odit dignissimos facilis repellendus! Quasi inventore dolor eos laudantium assumenda, deleniti, labore, provident neque quidem sed iusto et ipsum repellat perferendis ex corrupti mollitia nesciunt! Ducimus ipsam ipsa magni quaerat doloremque fugiat ab eligendi! Unde, ullam distinctio laboriosam neque delectus facere nihil ipsa nesciunt. Eligendi reprehenderit, id provident maiores autem dignissimos doloremque quod, dolorem minima voluptatem dolores blanditiis illo assumenda ducimus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
