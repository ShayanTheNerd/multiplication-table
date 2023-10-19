export default function warnNonDesktopDevices() {
	if (deviceIsDesktop) return;

	const warningModal = document.querySelector('#warning_modal');
	const warningModalCloseBtn = warningModal.querySelector(`button[aria-controls="${warningModal.id}"]`);

	warningModal.showModal();
	warningModalCloseBtn.addEventListener('click', () => warningModal.close(), { once: true });
}

export const deviceIsDesktop = !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.deviceInfo);
