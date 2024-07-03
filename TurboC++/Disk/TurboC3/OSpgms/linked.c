#include<stdio.h>
#include<string.h>
struct file
{
        char name[10];
        int l,st,block[10];
}f[10];
void main()
{
        int n,i,j;
        printf("enter no of files:");
        scanf("%d",&n);
        for(i=1;i<=n;i++)
        {
		 printf("enter %d file name,index block,length of file:",i);
                scanf("%s %d %d",f[i].name,&f[i].st,&f[i].l);
        }
	for(i=1;i<=n;i++)
	{
		printf("enter %d blocknames for %s file allocation:",f[i].l,f[i].name);
		for(j=1;j<=f[i].l;j++)
		{
			scanf("%d",&f[i].block[j]);
		}
	}
        printf("linked allocation:\n");
	printf("filename\tmainblock\tlength\tallocatedblks\n");
        for(i=1;i<=n;i++)
        {
                printf("%s\t\t%d\t\t%d\t\t%d ->",f[i].name,f[i].st,f[i].l,f[i].st);
                for(j=1;j<=f[i].l;j++)
                {	
                        printf("%d ",f[i].block[j]);
			if(j!=f[i].l)
			{
				printf("->");
			}
                }
		printf("\n");
        }
}

