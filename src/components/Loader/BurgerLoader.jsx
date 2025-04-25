import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const BurgerLoader = () => {
    return (
        <div>
            <DotLottieReact
                className='w-[10rem] h-[10rem]'
                src="https://lottie.host/00f20c8c-3a02-4a69-91b2-9f778578fa62/h9F6VaUXHm.lottie"
                loop
                autoplay
                speed={2}
            />
        </div>
    )
}

export default BurgerLoader