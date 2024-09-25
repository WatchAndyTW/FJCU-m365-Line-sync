export default class EnvUtil {
    public static checkIfNotNull(envList: Array<string>) {
        for (let env of envList) {
            if (process.env[env]) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    }
}