export default function Features() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Optimize your React applications through systematic profiling</h2>
            <p className="text-xl text-gray-400">with metronome, you'll dispel all ambiguity regarding the bottlenecks in your React components</p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>

            {/* 1st item */}
            <div className="relative flex flex-col items-center text-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" >
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                <path className="stroke-current fill-current text-purple-100" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"strokeLinecap="square" strokeWidth=".7" fill="none" fillRule="evenodd"transform="translate(20, 20) scale(1.5)"/>
                <path className="stroke-current fill-current text-purple-300" d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" strokeLinecap="square" strokeWidth="1" transform="translate(20, 20) scale(1.5)"/>
              </svg>
              <h4 className="h4 mb-2">Session Profiling</h4>
              <p className="text-lg text-gray-400 text-center">Controlled profiling scope--start and stop profiling as needed to capture render behavior of a specific action or series of actions </p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle className="fill-current text-purple-600" cx="32" cy="32" r="32" />
                <path className="stroke-current fill-current text-purple-100" strokeWidth=".7" strokeLinecap="square" d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777l-3-4.5zM6.437 4.758A.5.5 0 0 0 6 4.5h-.066L8 1.401 10.066 4.5H10a.5.5 0 0 0-.424.765L11.598 8.5H11.5a.5.5 0 0 0-.447.724L12.69 12.5H3.309l1.638-3.276A.5.5 0 0 0 4.5 8.5h-.098l2.022-3.235a.5.5 0 0 0 .013-.507z" fill="none" fillRule="evenodd" transform="translate(20, 20) scale(1.5)"/>
              </svg>
              <h4 className="h4 mb-2">Interactive Component Tree</h4>
              <p className="text-lg text-gray-400 text-center">Inspect the component hierarchy generated from your profiled session</p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64"xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                  <path className="stroke-current fill-current text-purple-100" strokeWidth=".7" d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"transform="translate(20, 20) scale(1.5)"/>
                  <path className="stroke-current fill-current text-purple-100" strokeWidth=".7" d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"transform="translate(20, 20) scale(1.5)"/>
              </svg>
              <h4 className="h4 mb-2">Component Render Durations</h4>
              <p className="text-lg text-gray-400 text-center">View total render durations for each component in an easy-to-understand pie chart</p>
            </div>

            {/* 4th item */}
            <div className="relative flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay="300" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                <path className="stroke-current fill-current text-purple-100" strokeWidth=".7" d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"transform="translate(20, 20) scale(1.5)"/>
              </svg>
              <h4 className="h4 mb-2">Component Render Frequencies</h4>
              <p className="text-lg text-gray-400 text-center">View component render frequencies in a straightforward bar chart</p>
            </div>

            {/* 5th item */}
            <div className="relative flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay="400" data-aos-anchor="[data-aos-id-blocks]">
              <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64"  xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-current text-purple-600" width="64" height="64" rx="32" />
                <path className="stroke-current fill-current text-purple-100" strokeWidth=".7" fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"transform="translate(20, 20) scale(1.5)"/>
                <path className="stroke-current fill-current text-purple-100" strokeWidth=".7" fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"transform="translate(20, 20) scale(1.5)"/>
              </svg>
              <h4 className="h4 mb-2">Download Your Session Data</h4>
              <p className="text-lg text-gray-400 text-center">Simply click on 'download file' to save a copy of your session data to your local machine</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
