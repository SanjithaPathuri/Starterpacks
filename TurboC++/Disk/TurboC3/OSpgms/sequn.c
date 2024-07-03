#include<stdio.h>
#include<string.h>
struct file
{
        char name[10];
        int l,st;
}f[10];
void main()
{
        int n,i,j;
        printf("enter no of files:");
        scanf("%d",&n);
        for(i=1;i<=n;i++)
        {
		 printf("enter %d file name,start block,length of file:",i);
                scanf("%s %d %d",f[i].name,&f[i].st,&f[i].l);
        }
        printf("sequential allocation-file allocation:\n");
	printf("filename\tstartblock\tlength\tallocatedblks\n");
        for(i=1;i<=n;i++)
        {
                printf("%s\t\t%d\t\t%d\t\t",f[i].name,f[i].st,f[i].l);
                for(j=0;j<f[i].l;j++)
                {
                        printf("%d ",f[i].st+j);
                }
		printf("\n");
        }
}

