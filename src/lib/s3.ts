import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.AWS_REGION || "",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

export async function uploadToS3(
    fileBuffer: Buffer,
    fileName: string,
    contentType: string
): Promise<string> {
    const bucketName = process.env.AWS_BUCKET_NAME || "";
    const key = `blogs/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
    });

    await s3Client.send(command);

    // Construct the S3 URL
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
