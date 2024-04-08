export async function wait(duration: number = 2000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("success")
        }, duration);
    })
}