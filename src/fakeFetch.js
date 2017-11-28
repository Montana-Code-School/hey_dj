export function fakeLogin(){
	return Promise.resolve({
		username: 'Johnny Depp',
		token: 'j0hnnyD3pp'
	});
}

// export fakeGetStatus = () => {
// 	return Promise.resolve({
// 		counter: 55
// 	})
// }