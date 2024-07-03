import * as React from 'react'

function Card() {
  return (
    <div className="flex flex-col pt-4 mx-auto w-full bg-white max-w-[480px] rounded-[32px]">
      <div className="flex z-10 flex-col px-7 w-full">
        <div className="self-center text-lg font-medium leading-6 text-center text-black">
          FaceitVisuals
        </div>
        <div className="flex flex-col self-center py-4 pr-4 pl-2 mt-16 w-full rounded-3xl border-0 border-white border-solid shadow-lg">
          <div className="flex gap-5 justify-between px-0.5">
            <img
              loading="lazy"
              srcSet="..."
              className="shrink-0 w-16 aspect-[1.69]"
            />
            <img
              loading="lazy"
              src="/logof.png"
              className="shrink-0 my-auto w-5 aspect-[0.83]"
            />
          </div>
          <div className="flex gap-5 mt-20 text-xs font-semibold tracking-wide text-white whitespace-nowrap">
            <div className="uppercase">SHADI</div>
            <div className="flex-auto text-right">06/24</div>
          </div>
          <div className="flex gap-5 text-base font-semibold text-white tracking-[2.4px]">
            <div className="flex-auto self-start mt-4">1234 1234 1234 1234</div>
            <img
              loading="lazy"
              src="/faceit.png"
              className="shrink-0 aspect-[1.41] fill-white fill-opacity-10 w-[45px]"
            />
          </div>
        </div>
        <div className="flex gap-2.5 p-4 mt-7 text-center rounded-xl bg-stone-300">
          <img
            loading="lazy"
            srcSet="..."
            className="shrink-0 w-12 aspect-square"
          />
          <div className="flex flex-1 gap-2.5 justify-between self-start pr-1.5">
            <div className="flex flex-col">
              <div className="text-2xl font-extrabold tracking-tight leading-5 text-black">
                Faceit Clan
              </div>
              <div className="text-sm tracking-normal leading-4 text-zinc-700 text-opacity-60">
                ••••{' '}
              </div>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ce4d97771a1138f49721710811c6414aeb178a99d6b7c443ccbdc663733424a?"
              className="shrink-0 my-auto w-2 aspect-[0.57] fill-zinc-700 fill-opacity-60"
            />
          </div>
        </div>
        <img
          loading="lazy"
          srcSet="..."
          className="mt-1.5 ml-4 aspect-[2.17] w-[82px]"
        />
        <div className="flex gap-2.5 p-4 text-base tracking-tight leading-5 text-center text-black rounded-xl bg-stone-300">
          <img
            loading="lazy"
            srcSet="..."
            className="shrink-0 self-start border border-gray-100 border-solid aspect-[1.43] w-[46px]"
          />
          <div className="flex flex-1 gap-2.5 justify-between px-px">
            <div className="flex flex-col">
              <div>Discord</div>
              <div>(Ask about,report system)</div>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ce4d97771a1138f49721710811c6414aeb178a99d6b7c443ccbdc663733424a?"
              className="shrink-0 my-auto w-2 aspect-[0.57] fill-zinc-700 fill-opacity-60"
            />
          </div>
        </div>
        <div className="flex gap-2.5 p-4 mt-4 text-base tracking-tight leading-5 text-center text-black rounded-xl bg-stone-300">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/14af57ccf526f193f0ca051bd725a8a5a86ce68970f890a73d67122e23ac3458?"
            className="shrink-0 self-start w-8 aspect-square fill-gray-100"
          />
          <div className="flex flex-1 gap-2.5 justify-between pr-1.5">
            <div className="flex flex-col">
              <div className="text-sm tracking-normal leading-4 text-zinc-700 text-opacity-60">
                Shipping
              </div>
              <div>Anthony Stark</div>
              <div>10880 Malibu Point</div>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9e75cbfef74921b64d6d317eda0e500ab9f82dcc61020579f63237406276aa2?"
              className="shrink-0 my-auto aspect-[0.54] fill-zinc-700 fill-opacity-60 w-[7px]"
            />
          </div>
        </div>
        <div className="flex gap-2.5 py-4 pr-2 pl-4 mt-4 rounded-xl bg-stone-300">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/41cc95024fa5c7546bacc05be76ce14b6946ef1b12d1e32781db7a4d8e98632b?"
            className="shrink-0 self-start w-8 aspect-square fill-gray-100"
          />
          <div className="flex gap-2.5 justify-between pr-1.5">
            <div className="flex flex-col text-center">
              <div className="text-sm tracking-normal leading-4 text-zinc-700 text-opacity-60">
                Shipping
              </div>
              <div className="text-base tracking-tight leading-5 text-black">
                Arrives 5-7 days
              </div>
            </div>
            <div className="flex gap-2 my-auto text-sm tracking-normal leading-4 text-right whitespace-nowrap text-zinc-700 text-opacity-60">
              <div>$0.00</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ce4d97771a1138f49721710811c6414aeb178a99d6b7c443ccbdc663733424a?"
                className="shrink-0 my-auto w-2 aspect-[0.57] fill-zinc-700 fill-opacity-60"
              />
            </div>
          </div>
        </div>
        <div className="justify-center items-center px-16 py-11 text-base font-medium leading-4 text-center text-white bg-neutral-950 rounded-[48px]">
          Donate a coffe
        </div>
      </div>
      <div className="flex justify-center items-center px-16 pt-5 pb-2 mt-0 w-full bg-white">
        <div className="shrink-0 bg-neutral-950 h-[5px] rounded-[100px] w-[149px]" />
      </div>
    </div>
  )
}
export default Card
