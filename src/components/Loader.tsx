import { useLocation } from "@solidjs/router";
import { useLoader } from "./common/Loader";
import "./Loader.css"
import { Component, createMemo } from "solid-js";
import { loginStore } from "./Navbar";
import { createStore } from "solid-js/store";

export interface LoaderType {
	isHex?: boolean;
  }
  const [state, setState] = createStore<LoaderType>({ isHex: true});
  export const loaderStore = state;
  export const setLoaderIsHexType = (isHex: boolean) => {
	setState("isHex", isHex);
  }

export const Loader: Component = () => {
	const [loading] = useLoader();

	return (
		<>
			<div class="tinter" hidden={!loading() || loaderStore.isHex}>
				<h1 class="now-loading">NOW LOADING</h1>
				<div class="now-loading-bar"></div>
			</div>
			<div class="loader-container" hidden={!loading() || !loaderStore.isHex}>
				<div class="gel c7 r2">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				
				<div class="gel c8 r2">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c9 r2">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c10 r2">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c11 r2">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c12 r2">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c13 r2">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c14 r2">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c15 r2">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c16 r2">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c17 r2">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c18 r2">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c19 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c20 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c21 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c22 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c23 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c24 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c25 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c26 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c28 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c29 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c30 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c31 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c32 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c33 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c34 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c35 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c36 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
				<div class="gel c37 r3">
					<div class="hex-brick h1"></div>
					<div class="hex-brick h2"></div>
					<div class="hex-brick h3"></div>
				</div>
			</div>
		</>
  );
}