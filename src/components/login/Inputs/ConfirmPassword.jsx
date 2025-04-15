
const ConfirmPassword = () => {
    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="relative">
                    <input
                        id="ConfirmPassword"
                        name="password"
                        type="password"
                        placeholder=""
                        className="border-b w-[20rem] border-gray-300 py-1 focus:border-b-2 focus:border-[#e99825] transition-colors focus:outline-none peer bg-inherit"
                    />
                    <label
                        htmlFor="ConfirmPassword"
                        className="absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
                    >
                        Confirm Password
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ConfirmPassword