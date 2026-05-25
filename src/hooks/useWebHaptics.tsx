import { useCallback } from "react";
import { useWebHaptics } from "web-haptics/react";

export function useWebHapticsHook() {
	const { trigger: _trigger } = useWebHaptics();

	const trigger = useCallback(
		function trigger() {
			return _trigger();
		},
		[_trigger]
	);

	return {
		trigger,
	};
}
